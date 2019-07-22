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

  Dimensions
} from 'react-native';

import Moment from 'moment';

import Input from '../components/myInput';
import { Button } from 'react-native-ui-kitten';
import DateTimePicker from "react-native-modal-datetime-picker";
import Picker from '../components/picker'



function App(props) {
  Moment.locale('en');

  const [dateVisible, setDateVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(true);


  const [selectedDate, setDate] = useState(Moment().format("h:MMA DD/MM"));

  function onConfirm(date) {
    setDate(Moment(date.toISOString()).format("h:MMA DD/MM"))
    setDateVisible(false)
  }
  return (
      
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      
        <Picker show={showPicker} close={()=> setShowPicker(false)}/>
        <Text style={{ margin: 40, fontSize: 20 }}>
          New Team
        </Text>

        <Input
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Team Name"
        />

        <Input
          style={styles.textInput}
          keyboardType="number-pad"
          autoCapitalize="none"
          placeholder="Number of People (Max 5)"
        />

        <Button style={{ margin: 20 }}>
          Submit
        </Button>
        <Button
          onPress={() => props.navigation.navigate('Login')}

          appearance="ghost">
          Back
        </Button>

        


      </KeyboardAvoidingView>
      

  );
}

const styles = StyleSheet.create(

  {
    container: {
      flex: 1,
      padding: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },

    dateText: {
      color: 'rgba(0,0,0,0.2)',
      textAlign: 'center',
    },

    textInput: {
      margin: 10,
    },
   
  },



);





export default App;