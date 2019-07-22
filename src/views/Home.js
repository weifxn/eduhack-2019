import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput
} from 'react-native';

import {
  List,
  ListItem,
} from 'react-native-ui-kitten';
import { TouchableOpacity } from 'react-native-gesture-handler';

const mylist = [
  {
    id: "232",
    name: "wf",
  },
  {
    id: "2311",
    name: "rice",
  },
  {
    id: "23223",
    name: "rice",
  }
]
function renderItem({ item, index }) {
  return (

    <View style={styles.listItem}>
      <Text>helllo</Text>
    </View>
  )
}

function App(props) {
  return (
    <View style={styles.container}>
      <FlatList
        style={{width: '100%'}}
        data={mylist}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create(

  {
    listItem: {
      marginTop: 30,
      width: "100%",
      height: 100,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.10,
      shadowRadius: 10.00,
      elevation: 10,
      backgroundColor: 'white'

    },
    container: {
      flex: 1,

      alignItems: 'center',
      justifyContent: 'center',
    },

    textInput: {
      margin: 10,
    },
  }

);





export default App;