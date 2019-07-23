import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import Input from '../components/myInput'
import ConfettiCannon from 'react-native-confetti-cannon';

import { Button } from 'react-native-ui-kitten';


function App(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  function login() {
    // check if input is blank
    if(username !== "" && password !== "") {
      // to navigate home
      props.navigation.navigate('PostOffer')  

    } else {
      // alert if input is blank
      Alert.alert("Please fill the empty field(s)!")
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
         <ConfettiCannon count={20} origin={{x: -10, y: 0}} />

      <Image
          style={{ width: '80%', height: 200, margin: 50 }}
          source={require('../assets/logo.png')}
        />
<Text style={{marginBottom: 50, fontSize: 30, fontWeight: 'bold'}}>🎉 Congratulations 🎉</Text>
<Text style={{marginVertical: 20, fontSize: 20, fontWeight: 'bold'}}>Here's your ticket!</Text>

<QRCode
      value="Just some string value"
      logoSize={70}
      logoBackgroundColor='transparent'
      logoMargin={100}
      size={200}


    />

      <Button
        style={{margin: 20}}
          onPress={() => props.navigation.navigate('SignUp')}
          appearance="ghost" >
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

    textInput: {
      margin: 10,
    },
    loginButton: {
      margin: 20,
    }
  }

);





export default App;