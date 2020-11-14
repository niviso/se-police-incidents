// In App.js in a new project
import MapView from 'react-native-maps';
import React,{useState,useEffect,useRef} from 'react';
import { Button, View, Text,TextInput,Image,ScrollView,TouchableOpacity,Dimensions,StyleSheet,ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/home';
import Details from './screens/details';
import OnboardingScreen from './screens/onboarding';
import SettingsScreen from './screens/settings';
import {AppProvider} from './context/appContext';
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"


TaskManager.defineTask("PUSH_TASK", () => {
  try {
    // fetch data here...
    const receivedNewData = "Simulated fetch " + Math.random();
    console.log("My task ", receivedNewData);
    console.log("WOO");
    return receivedNewData
      ? BackgroundFetch.Result.NewData
      : BackgroundFetch.Result.NoData
  } catch (err) {
    return BackgroundFetch.Result.Failed
  }
})

RegisterBackgroundTask = async () => {
  try {
    const options = {
      minimumInterval: 1 // in seconds
    };
  await BackgroundFetch.registerTaskAsync("PUSH_TASK", options);
    console.log("Task registered")
  } catch (err) {
    console.log("Task Register failed:", err)
  }
}

RegisterBackgroundTask();

const Stack = createStackNavigator();

function App() {
  const navigationRef = useRef(null)
  return (
    <AppProvider>
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Home"
      screenOptions={{
  headerBackTitle: "Tillbaka"
}}>
        <Stack.Screen name="Home" component={Home}
          options={{
          title: 'Händelser i Stockholm',
          headerRight: () => (
            <Button
              onPress={() => navigationRef.current?.navigate('Settings')}
              title="⚙"
              color="#fff"
            />
          ),
          headerLeft: null,
          headerStyle: {
            backgroundColor: '#1862a8',
          },
          headerTintColor: '#fff',
        }} />
        <Stack.Screen name="Details" component={Details}
          options={{
          headerStyle: {
            backgroundColor: '#b73a39',
          },
          headerTintColor: '#fff',
        }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen}
          options={{
          title: 'Välkommen',
          headerStyle: {
            backgroundColor: '#0c3256',
          },
          headerTintColor: '#fff',
        }} />
        <Stack.Screen name="Settings" component={SettingsScreen}
          options={{
          title: 'Inställningar',
          headerStyle: {
            backgroundColor: '#0c3256',
          },
          headerTintColor: '#fff',
        }} />
      </Stack.Navigator>
    </NavigationContainer>

    </AppProvider>
  );
}

export default App;
