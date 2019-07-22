import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';


function App() {
  return (
    <View style={styles.container}>

      

      <TextInput 
        style={styles.textInput}
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.textInput}
        secureTextEntry={true}
        autoCapitalize="none"
      />




      <TouchableOpacity>
      <View>
      <Text>Hello World</Text>
      </View>
      </TouchableOpacity>

      
      <Button title="submit" />
    </View>
  );
}

const styles = StyleSheet.create(
  
  {
    container: {
      flex: 1,
      backgroundColor: '#444',
      alignItems: 'center',
      justifyContent: 'center',
    },

    textInput: { 
      height: 20, 
      width: 150, 
      backgroundColor: 'white', 
      textAlign: 'center',
      margin: 20,
    },
  }

);





export default App;