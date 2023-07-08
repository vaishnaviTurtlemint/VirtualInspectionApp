import React, {useState} from 'react';
import {Button, Image, Text, View} from 'react-native';
import {
  OTP_UI_DISPLAY_MSG,
  OTP_UI_VERIFICATION_DISPLAY_MSG,
  OTP_VERIFICATION,
  RESEND_OTP,
  VEHICLE_INSPECTION,
} from '../../constants/web-text';
import {TextInput} from 'react-native-paper';
import {getUser} from "../../services/APICallIntegration"

function Login({navigation}:any): JSX.Element {
  const [otpInitiated, setOtpInitiated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const callApi = () => {
    getUser();
    setOtpInitiated(true)
    navigation.navigate('CameraAllClick');
  }

  return (
    <View style={{height: '100%', width: '100%'}}>
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
            resizeMode: 'contain',
            tintColor: '#009a5a',
          }}
          source={require('../../images/turtlemint.png')}
        />
      </View>
      {!otpInitiated && (
        <View style={{height: '100%', width: '100%'}}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              marginTop: 100,
            }}>
            <View
              style={{
                height: 48,
                width: '80%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderColor: '#0000000',
                backgroundColor: '#0000000',
                borderRadius: 7,
                flexDirection: 'row',
              }}>
              <TextInput
                style={{
                  width: '22%',
                  height: 48,
                  borderLeftColor: '#808080',
                  backgroundColor: '#FFFFFF',
                  fontWeight: 'bold',
                  textAlign: 'left',
                }}
                placeholder="91+"
                keyboardType="numeric"
                editable={false}></TextInput>

              <TextInput
                style={{
                  width: '80%',
                  height: 48,
                  backgroundColor: '#FFFFFF',
                  fontWeight: 'bold',
                  textAlign: 'left',
                }}
                maxLength={10}
                onChange={event => {
                  setPhoneNumber(event.nativeEvent.text);
                }}
                placeholder="Enter Your Phone Number"
                placeholderTextColor={'#808080'}
                keyboardType="numeric"></TextInput>
            </View>
            <View
              style={{
                height: 48,
                width: '80%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderColor: '#0000000',
                backgroundColor: '#0000000',
                borderRadius: 7,
                flexDirection: 'row',
              }}>
              <Text>{OTP_UI_DISPLAY_MSG}</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              bottom: 100,
              width: '100%',
            }}>
            <View style={{width: '90%'}}>
              <Button
                disabled={phoneNumber.length != 10}
                title="Submit"
                color="#009a5a"
                onPress={() => setOtpInitiated(true)}
              />
            </View>
          </View>
        </View>
      )}

      {otpInitiated && (
        <View style={{height: '100%', width: '100%'}}>
          <View style={{ marginTop:100, marginLeft: 20, marginRight: 20}}>
            <Text style={{fontSize: 35, fontWeight: 'bold', color: '#000000'}}>
              {OTP_VERIFICATION}
            </Text>
            <Text style={{fontSize: 15, color: '#000000'}}>
              {OTP_UI_VERIFICATION_DISPLAY_MSG}
              {phoneNumber}
            </Text>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <TextInput
                style={{backgroundColor: '#D3D3D3'}}
                keyboardType="numeric"
                maxLength={1}></TextInput>
              <TextInput
                style={{backgroundColor: '#D3D3D3'}}
                keyboardType="numeric"
                maxLength={1}></TextInput>
              <TextInput
                style={{backgroundColor: '#D3D3D3'}}
                keyboardType="numeric"
                maxLength={1}></TextInput>
              <TextInput
                style={{backgroundColor: '#D3D3D3'}}
                keyboardType="numeric"
                maxLength={1}></TextInput>
            </View>

            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#009a5a',
                textAlign: 'right',
                marginTop: 15,
              }}>
              {RESEND_OTP}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              bottom: 100,
              width: '100%',
            }}>
            <View style={{width: '90%'}}>
              <Button
                disabled={phoneNumber.length != 10}
                title="Submit"
                color="#009a5a"
                onPress={() => callApi()}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

export default Login;
