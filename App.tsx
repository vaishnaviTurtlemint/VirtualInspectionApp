/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  } from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import Login from './component/login';
import LandingPage from './component/landingPage';
import CameraClick from './component/camera/capturePhoto';
import RecordVideo from './component/camera/recordVideo';
import GeolocationTrack from './component/geoLocation';
import VehicleDetailsForm from './component/Form';
import CameraAllClick from './component/camera/captureAllPhotos';
import SubmissionPage from './component/submitPage';



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Landing' screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Landing"
          component={LandingPage}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="VehicleDetailsForm" component={VehicleDetailsForm} />
        <Stack.Screen name="CameraClick" component={CameraClick} />
        <Stack.Screen name="CameraAllClick" component={CameraAllClick}/>
        <Stack.Screen name="RecordVideo" component={RecordVideo} />
        <Stack.Screen name="GeolocationTrack" component={GeolocationTrack} />
        <Stack.Screen name="SubmissionPage" component={SubmissionPage} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
