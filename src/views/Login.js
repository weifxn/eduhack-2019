import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Alert
} from 'react-native';

import Input from '../components/myInput'

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

      <Image
          style={{ width: '80%', height: 200, margin: 50 }}
          source={require('../assets/logo.png')}
        />
        <Input
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Username"
          onChangeText={setUsername}
        />
        <Input
          style={styles.textInput}
          secureTextEntry={true}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={setPassword}
          onSubmitEditing={login}
        />

      <Button
        onPress={login}
        style={styles.loginButton}
      >
        Login
      </Button>

      <Button
          onPress={() => props.navigation.navigate('SignUp')}
          appearance="ghost" >
        Sign Up
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