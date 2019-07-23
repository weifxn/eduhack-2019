import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput,
  Alert
} from 'react-native';

import ActionButton from 'react-native-action-button';

import {
  SkypeIndicator,
} from 'react-native-indicators';

import {
  List,
  ListItem,
} from 'react-native-ui-kitten';
import { TouchableOpacity } from 'react-native-gesture-handler';

import firebase from '../../firebase'

const mylist = [
  {
    name: "wf",
    uni: 'Sunway',
    members: [],
  },
  {
    name: "wf",
    uni: 'Sunway',
    members: [],
  },
  {
    name: "wf",
    uni: 'Sunway',
    members: [],
  },
]



function App(props) {
  const [items, setItems] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
      getData()
    }, [])

  const checkDone = () => {
    if (isLoading) {
      console.log(JSON.stringify(items))
    }
  }

  const getData = () => {
    firebase
      .database()
      .ref()
      .child("teams")
      .on('value', snap => {
        if(snap !== null) {
          snap.forEach(item => {
            const data = item.val()
            var payload = {
              name: data.name,
              uni: data.uni,
              members: data.members
            }
            const list = items
            list.push(payload)
            setItems(list)
            setLoading(false)
          });
          checkDone()

        }
      })
  }

  function renderItem({ item, index }) {
    return (
  
      <View style={styles.listItem}>
        <Text>{item.name}</Text>
        <Text>{item.uni}</Text>
  
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ActionButton
  buttonColor="rgba(231,76,60,1)"
  onPress={() => { console.log("hi")}}
/>
      {!isLoading ?


      <FlatList
        style={{width: '100%'}}
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString() }
      /> 
      
      :


      <SkypeIndicator color="black"/>


      }
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