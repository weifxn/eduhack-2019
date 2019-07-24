import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    ScrollView,
    FlatList,
    Dimensions,
    AsyncStorage,
    Image,
    Alert
} from 'react-native';
import Firebase from '../../firebase'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
var { height, width } = Dimensions.get('window');

import Moment from 'moment';

import Input from '../components/myInput';
import { Button } from 'react-native-ui-kitten';
import DateTimePicker from
    "react-native-modal-datetime-picker";
import Picker from '../components/picker'

const data = [
    {
        label: "XS",
        value: "XS",
    },
    {
        label: "S",
        value: "S",
    },
    {
        label: "M",
        value: "M",
    },
    {
        label: "L",
        value: "L",
    },
    {
        label: "XL",
        value: "XL",
    },
]

const initialMember = [{ name: '', size: 'M' }, { name: 'wf', size: 'S' },]


function App(props) {
    Moment.locale('en');
    const [name, setName] = useState(false);
    const [uni, setUni] = useState(false);

    const [dateVisible, setDateVisible] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [memberList, setMemberList] = useState(initialMember)
    const [pickerIndex, setPickerIndex] = useState();
    const [selectedDate, setDate] = useState(Moment().format("h:MMA DD/MM"));

    const [chat, setChat] = useState([])
    const [message, setMessage] = useState("")


    function pickSize(index) {
        setShowPicker(true);
        setPickerIndex(index)
    }
    function setMember(text, index) {
        const list = memberList
        list[index].name = text
    }
    function resetData() {
        setName("")
        setUni("")
        setMemberList([])
    }
    function onSubmit() {
        const payload = {
            name,
            uni,
            members: memberList,
        }
        Firebase
            .database()
            .ref()
            .child("teams")
            .push(payload)
            .then(ref => {
                console.log(ref.key);
                resetData();
                props.navigation.navigate('Ticket')
            })
    }
    const onChatSubmit = () => {
        const payload = {
            message,
            isYou: true,
        }
        setChat([payload, ...chat])
    
        setMessage("")

    }

    function renderItem({ item, index }) {
        return (

            <TouchableOpacity
                onPress={() => deleteItem(index)}
            >
                {!item.isYou ? 
                <View style={{ alignSelf: 'flex-start', width: width }}>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                    <View></View>
                    <View style={styles.sizeInput}>
                        <Text>{item.message}</Text>
                    </View>
                </View>
            </View>
                :
                <View style={{ alignSelf: 'flex-end', width: width }}>
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                        <View></View>
                        <View style={styles.sizeInput}>
                            <Text>{item.message}</Text>
                        </View>
                    </View>
                </View>
                }
            </TouchableOpacity> 

        )
    }
    function deleteItem(index) {


        Alert.alert(JSON.stringify(chat))

        setChat(chat.splice(index, 1))


    }
    function addMember() {
        if (memberList.length < 5)
            setMemberList([...memberList, { name: '', size: 'M' }])
    }
    function onConfirm(date) {
        setDate(Moment(date.toISOString()).format("h:MMA DD/MM"))
        setDateVisible(false)
    }
    function submitSize(value) {
        console.log(value + '' + pickerIndex)
        var list = memberList;
        list[pickerIndex].size = value
        setMemberList(list)
        setShowPicker(false)
    }
    return (

        <View keyboardShouldPersistTaps="always" style={{ flex: 1, alignItems: 'center' }}>

            <Picker
                data={data}
                show={showPicker}
                close={() => setShowPicker(false)}
                submit={(val) => submitSize(val)} />

            <Image
                style={{ width: 100, height: 100, margin: -10 }}
                source={require('../assets/icon.png')}
            />

            <Text style={{ margin: 20, fontSize: 20 }}>
                todo
        </Text>
            <FlatList
            inverted={true}
                style={{ paddingBottom: 20, flex: 1, }}
                renderItem={renderItem}
                keyExtractor={(v, index) => index.toString()}
                data={chat}
                extraData={this.state}

            />



            <KeyboardAvoidingView behavior="padding" enabled>


                <View style={{flexDirection: 'row'}}>
                <Input
                    value={message}
                    style={styles.textInput}
                    placeholder="Enter message"
                    onChangeText={setMessage}
                    onSubmitEditing={onChatSubmit}
                    blurOnSubmit={false}

                />
                <TouchableOpacity
                onPress={onChatSubmit}>
                    <View style={styles.button}>

                    </View>
                </TouchableOpacity>
                </View>


            </KeyboardAvoidingView>



        </View>

    );
}

const styles = StyleSheet.create(

    {
        container: {
            flex: 1,
            paddingTop: 20,
            alignItems: 'center',
            paddingHorizontal: 30,
            height: height + 200
        },
        dateText: {
            color: 'rgba(0,0,0,0.2)',
            textAlign: 'center',
        },

        textInput: {
            width: width - 80,
            margin: 10,
            textAlign: 'left',
            paddingLeft: 20,
        },
        sizeInput: {
            zIndex: 10,
            justifyContent: 'center',

            height: 50,
            padding: 5,
            paddingHorizontal: 20,
            alignItems: 'center',
            backgroundColor: 'white',
            margin: 10,
            borderRadius: 20,
            textAlign: 'center',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 10,
            },
            shadowOpacity: 0.10,
            shadowRadius: 10.00,

            elevation: 10,
        },
        button: {
            backgroundColor: 'white', width: 40, height: 40, borderRadius: 50, marginTop: 20,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 10,
            },
            shadowOpacity: 0.10,
            shadowRadius: 10.00,

            elevation: 10,
        }

    },



);





export default App;