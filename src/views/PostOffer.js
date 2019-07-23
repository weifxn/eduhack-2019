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
  Image
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
      .then(ref=>{
          console.log(ref.key);
          resetData();
          props.navigation.navigate('Ticket')
      })
  }
  function renderItem({ item, index }) {
    return (
      <View key={index} style={{ flexDirection: 'row' }}>
        <Input style={{ width: 200 }}
          placeholder={`Member ${index + 1} Name`}
          onChangeText={text=>setMember(text, index)}
        />
        <TouchableOpacity
          onPress={() => pickSize(index)}
        >
          <View style={styles.sizeInput}>
            <Text>{item.size}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
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

    <KeyboardAwareScrollView contentContainerStyle={styles.container} behavior="padding" enabled>

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
        Team Registration
        </Text>

      <Input
        style={styles.textInput}
        autoCapitalize="none"
        placeholder="Team Name"
        onChangeText={setName}

      />

      <Input
        style={styles.textInput}
        autoCapitalize="none"
        placeholder="University"
        onChangeText={setUni}

      />

      <FlatList
        style={{ flexGrow: 0, paddingBottom: 20 }}
        renderItem={renderItem}
        keyExtractor={(v, index) => index.toString()}
        data={memberList}

      />
      <Button
        onPress={() => addMember()}
        style={{ marginBottom: 10, marginTop: -15 }}
        appearance="ghost">

        Add member
        </Button>

      <Button
      onPress={onSubmit}
        style={{ margin: 10 }}>
        Submit
        </Button>
      <Button
        onPress={() => props.navigation.navigate('Login')}
        style={{ marginBottom: 0 }}
        appearance="ghost">
        Back
        </Button>

    </KeyboardAwareScrollView>

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
      margin: 10,
    },
    sizeInput: {
      zIndex: 10,
      justifyContent: 'center',
      width: 50,
      height: 50,
      marginLeft: 0,
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
    }

  },



);





export default App;