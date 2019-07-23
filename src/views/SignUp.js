import React, {useState} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Alert
} from 'react-native';

import Input from '../components/myInput';
import { Button } from 'react-native-ui-kitten';
import firebase from '../../firebase'

function App(props) {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const onSubmit = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(()=>{
        props.navigation.navigate('Login')
      })
      .catch(error=> Alert.alert(error.message))

    
  }
  return (
    <ScrollView>
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
    <Image
          style={{ width: 100, height: 100, margin:-10 }}
          source={require('../assets/icon.png')}
        />
     
      <Text style={{margin: 40, fontSize: 20}}>Sign Up</Text>
      

      <Input 
        style={styles.textInput}
        onChangeText={setUsername}
        autoCapitalize="none"
        placeholder="Username"
      />
      <Input 
        style={styles.textInput}
        onChangeText={setEmail}

        autoCapitalize="none"
        placeholder="Email"
      />
    <Input
        style={styles.textInput}
        secureTextEntry={true}
        autoCapitalize="none"
        placeholder="Password"
        onChangeText={setPassword}
      />

      <Input 
        style={styles.textInput}

        secureTextEntry={true}
        autoCapitalize="none"
        placeholder="Confirm Password"
      />

      <Button style={{margin: 20}}
        onPress={onSubmit}
      >
        Submit
        </Button>
        <Button 
        onPress={() =>  props.navigation.navigate('Login')}

        appearance="ghost">
        Back
        </Button>
    </KeyboardAvoidingView>
    </ScrollView>
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
  }

);





export default App;