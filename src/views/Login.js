import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView
} from 'react-native';

import Input from '../components/myInput'

import { Button } from 'react-native-ui-kitten';


function App(props) {

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
        />
        <Input
          style={styles.textInput}
          secureTextEntry={true}
          autoCapitalize="none"
          placeholder="Password"
        />




      <Button
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