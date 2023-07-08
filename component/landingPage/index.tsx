import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { APP_DESCRIPTION, VEHICLE_INSPECTION } from '../../constants/web-text';

function LandingPage({ navigation }: any): JSX.Element {
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
      }}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-end',
        }}>
        <Image
          style={{
            top: 10,
            right: 10,
            width: 150,
            // height: "auto",
            resizeMode: 'contain',
            tintColor: '#009a5a',
          }}
          source={require('../../images/turtlemint.png')}
        />
      </View>
      <View
        style={{
          height: 80,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          top: 150,
        }}>
        <Image
          style={{
            flex: 1,
            width: '100%',
            height: '20%',
            resizeMode: 'contain',
            tintColor: '#009a5a',
          }}
          source={require('../../images/inspection-preview.png')}
        />
      </View>

      <View
        style={{
          height: 80,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          top: 160,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 40,
            color: '#009a5a',
          }}>
          {VEHICLE_INSPECTION}
        </Text>
      </View>

      <View
        style={{
          height: 80,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          top: 140,
        }}>
        <Text
          style={{
            fontSize: 15,
            color: '#000000',
          }}>
          {APP_DESCRIPTION}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          bottom: 50,
          width: '100%',
        }}>
        <View style={{ width: '90%' }}>
          <Button title="Sign up" color="#009a5a" onPress={() =>
            navigation.navigate('Login')
          } />
        </View>
      </View>
      
    </View>
  );
}

export default LandingPage;
