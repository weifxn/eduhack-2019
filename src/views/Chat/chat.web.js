import React, { useState, useEffect } from 'react';
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
import Firebase from '../../../firebase'
import {
    SkypeIndicator,
  } from 'react-native-indicators';

import Moment from 'moment';

import Input from '../../components/myInput';
import { Button } from 'react-native-ui-kitten';
import DateTimePicker from
    "react-native-modal-datetime-picker";

    import Modal from "modal-enhanced-react-native-web";


var { height, width } = Dimensions.get('window');


const initialMember = [{ name: '', size: 'M' }, { name: 'wf', size: 'S' },]


function App(props) {
    Moment.locale('en');
    const [input, setInput] = useState();

    const [name, setName] = useState(false);
    const [uni, setUni] = useState(false);
    const [yourName, setYourName] = useState();

    const [dateVisible, setDateVisible] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [memberList, setMemberList] = useState(initialMember)
    const [pickerIndex, setPickerIndex] = useState();
    const [selectedDate, setDate] = useState(Moment().format("h:MMA DD/MM"));

    const [chat, setChat] = useState([])
    const [message, setMessage] = useState("")
    const [isLoading, setLoading] = useState(true)
    const [items, setItems] = useState([])


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
            name: yourName
        }
        setChat([payload, ...items])
        Firebase
            .database()
            .ref()
            .child("chat")
            .push(payload)
            .then(ref => {
            })
    
        setMessage("")

    }

    const onOtherChatSubmit = () => {
        const payload = {
            message,
            name: "test"
        }
        setChat([payload, ...items])
        Firebase
        .database()
        .ref()
        .child("chat")
        .push(payload)
        .then(ref => {
        })
        setMessage("")

    }

  useEffect(() => {
    getData()
  }, [])

  const checkDone = (list) => {
    if (isLoading) {
        setItems(list)

      console.log(JSON.stringify(items))
    }
  }

  const getData = () => {
    Firebase
      .database()
      .ref()
      .child("chat")
      .on('value', snap => {
        if (snap !== null) {
            var list = []

          snap.forEach(item => {
            const data = item.val()
            console.log(JSON.stringify(data))

            var payload = {
              message: data.message,
              name: data.name
              
            }
            list = [payload, ...list]
            setLoading(false)
          });
          checkDone(list)

        }
      })
  }
  function submitName() {
      setYourName(input)
  }

    function renderItem({ item, index }) {
        return (

            <TouchableOpacity
                onPress={() => deleteItem(index)}
            >
                {item.name == yourName ? 
                <View style={{ alignSelf: 'flex-end', width: width }}>
                <View style={{ flexDirection: 'column', alignSelf: 'flex-end' }}>
                <Text style={{textAlign:'right', fontWeight: 'bold', fontSize: 10,marginTop: 15, marginRight: 20, marginBottom:-2}}>{item.name}</Text>

                    <View style={styles.sizeInput}>

                        <Text>{item.message}</Text>
                    </View>
                </View>
            </View>
                :
                <View style={{ alignSelf: 'flex-start', width: width }}>
                <View style={{ flexDirection: 'column', alignSelf: 'flex-start' }}>
                <Text style={{textAlign:'left', fontWeight: 'bold', fontSize: 10,marginTop: 15, marginLeft: 20, marginBottom:-2}}>{item.name}</Text>
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


            <Image
                style={{ width: 100, height: 100, margin: 5 }}
                source={require('../../assets/icon.png')}
            />

            
 {!isLoading ?


<FlatList
            inverted={true}
                style={{ paddingBottom: 20, flex: 1, }}
                renderItem={renderItem}
                keyExtractor={(v, index) => index.toString()}
                data={items}


            />

:


<SkypeIndicator color="black" />


}


            <KeyboardAvoidingView behavior="padding" enabled>


                <View style={{flexDirection: 'row'}}>
                <Input
                    value={message}
                    style={styles.textInput}
                    placeholder="Enter message"
                    onChangeText={setMessage}
                    onSubmitEditing={onChatSubmit}
                    blurOnSubmit={false}
                    keyboardAppearance="light"

                />
                <TouchableOpacity
                onPress={onOtherChatSubmit}>
                    <View style={styles.button}>

                    </View>
                </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>



           {
             !yourName  &&  <Modal isVisible={true} >
                  <View style={{borderRadius: 20, padding: 50, backgroundColor: 'white', alignItems: 'center', justifyContent:'center'}}>
         <Image
                style={{ width: 100, height: 100, margin: 5 }}
                source={require('../../assets/icon.png')}
            />
        <Text style={{fontWeight: 'bold', margin: 50, fontSize: 90, color: '#111'}}>Hello! </Text>

<Text style={{fontWeight: 'bold', margin: 0, fontSize: 40, color: '#111', textAlign: 'center'}}>Enter your nickname</Text>

    <Input
value={input}
style={styles.nameInput}
placeholder="Batman, Tarantino, Frank Ocean or whatever"
onChangeText={setInput}
onSubmitEditing={submitName}

keyboardAppearance="light"
    />
    
    </View>
                </Modal>
           }

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
        nameInput: {
            width: 300,
            margin: 10,
            textAlign: 'center',
            padding: 20,
        },
        sizeInput: {
            zIndex: 10,
            justifyContent: 'center',

            height: 50,
            padding: -10,
            paddingHorizontal: 20,
            alignItems: 'center',
            backgroundColor: 'white',
            margin: 15,
            marginBottom: 10,
            marginTop: 0,
            borderRadius: 20,
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