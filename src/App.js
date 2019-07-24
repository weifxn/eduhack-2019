import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native'

import { createStackNavigator, createAppContainer } from "react-navigation";
// UI Kitten
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';

import LoginPage from './src/views/Login'
import SignUpPage from './src/views/SignUp'
import HomePage from './src/views/Home'
import PostOfferPage from './src/views/PostOffer/index'
import AgendaPage from './src/views/Agenda'
import TicketPage from './src/views/Ticket'
import ChatPage from './src/views/Chat'




const RootStack = createStackNavigator({
  Login: LoginPage,
  SignUp: SignUpPage,
  Home: HomePage,
  Agenda: AgendaPage,
  Post: PostOfferPage,
  Ticket: TicketPage,
  Chat: ChatPage
}, {
    headerMode: 'none',
    initialRouteName: 'Chat'
  })

const AppContainer = createAppContainer(RootStack);

function App() {
  return (
    <ApplicationProvider
      mapping={mapping}
      theme={lightTheme}>
      <View style={{ flex: 1, backgroundColor: '#eee', }}>
        <StatusBar barStyle="dark-content" />
        <AppContainer />
      </View>
    </ApplicationProvider>
  );
}

export default App;