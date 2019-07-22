import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';

import { Input } from 'react-native-ui-kitten';


function App() {
  return (
    <View style={styles.container}>

      

      <Input 
        style={styles.textInput}
        autoCapitalize="none"
        label="Username"
      />
      <Input 
        style={styles.textInput}
        secureTextEntry={true}
        autoCapitalize="none"
        label="Password"
      />




      <TouchableOpacity>
      <View>
      <Text style={{color: 'white'}}>Login</Text>
      </View>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create(
  
  {
    container: {
      flex: 1,
      padding: 30,
      backgroundColor: 'rgb(31,36,48)',
      alignItems: 'center',
      justifyContent: 'center',
    },

    textInput: { 
      margin: 10,
    },
  }

);





export default App;