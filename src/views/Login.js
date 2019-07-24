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
import {
  SkypeIndicator,
} from 'react-native-indicators';
import Input from '../components/myInput'

import { Button } from 'react-native-ui-kitten';

import firebase from '../../firebase'

function App(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  function login() {
    // check if input is blank
    if (username !== "" && password !== "") {
      // to navigate home
      setLoading(true)
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
    setPassword("")
    setUsername("")
    setLoading(false)

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
      {isLoading ? 
                      <SkypeIndicator color="black" />
:
<View style={{width: '100%', alignItems: 'center'}}>
<Input
        value={username}
        style={styles.textInput}
        autoCapitalize="none"
        placeholder="Username"
        onChangeText={setUsername}
      />
      <Input
      
        value={password}
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
</View>  
    }
     

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