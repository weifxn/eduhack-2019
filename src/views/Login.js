import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage
} from 'react-native';

import Input from '../components/myInput'

import { Button } from 'react-native-ui-kitten';

import firebase from '../../firebase'

function App(props) {
  const [username, setUsername] = useState("wf");
  const [password, setPassword] = useState("123123");

  function login() {
    // check if input is blank
    if (username !== "" && password !== "") {
      // to navigate home
      firebase
        .database()
        .ref()
        .child('users')
        .child(username)
        .once('value', function (snapshot) {
          if (snapshot.exists()) {
            var email = (snapshot.val() && snapshot.val().email);
            firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then(() => loginSuccess())
              .catch(error => Alert.alert(error.message))
          }
        })
        .catch(error => Alert.alert(error.message))



    } else {
      // alert if input is blank
      Alert.alert("Please fill the empty field(s)!")
    }
  }

  function loginSuccess() {
    _storeData()
    props.navigation.navigate('Chat')
  }
  useEffect(() => {
    _retrieveData()

}, [])


  _storeData = async () => {
    try {
      await AsyncStorage.setItem('name', username);
    } catch (error) {
      // Error saving data
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('name');
      if (value !== null) {
        // We have data!!
        props.navigation.navigate('Chat')
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

      <Image
        style={{ width: 250, height: 200, margin: 50 }}
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