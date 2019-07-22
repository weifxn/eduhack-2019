import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native'

// UI Kitten
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';

import Login from './src/views/Login'
import SignUp from './src/views/SignUp'

function App() {
  return (
    <ApplicationProvider
    mapping={mapping}
    theme={lightTheme}>

      
    <View style={{flex: 1}}>
       <StatusBar backgroundColor="blue" barStyle="light-content" />
      <SignUp />
    </View>


    </ApplicationProvider>
  );
}

export default App;