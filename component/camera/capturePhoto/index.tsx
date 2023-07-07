import React, { useEffect, useRef, useState } from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
  Touchable,
  TouchableOpacity,
  Image
} from 'react-native';


export default function CameraClick({ navigation }: any): JSX.Element {
  const camera = useRef<Camera | null>(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const [imageDate, setimageDate] = useState('');
  const [takePhotoClicked, settakePhotoClicked] = useState(false);

  useEffect(() => {
    checkPremission()
  }, [])

  const checkPremission = async () => {
    const cameraPermission = await Camera.requestCameraPermission()
    console.log('====================================');
    console.log(cameraPermission);
    console.log('====================================');
  }

  const takePicture = async () => {
    if (camera != null && camera.current != null) {
      const photo = await camera.current.takePhoto();
      console.log('====================================', photo.path);
      setimageDate(photo.path);
      settakePhotoClicked(false);
    }

  }

  if (device == null) return <ActivityIndicator></ActivityIndicator>

  return (
    <View style={{ flex: 1 }}>
      {takePhotoClicked ? (<View style={{ flex: 1 }}>
        <Camera ref={camera} style={StyleSheet.absoluteFill} device={device} isActive={true} photo={true}></Camera>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#FF0037',
            position: "absolute",
            bottom: 50,
            alignSelf: "center"
          }}
          onPress={() => {
            takePicture();
          }}
        ></TouchableOpacity>
      </View>) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {imageDate != '' && (<Image source={{ uri: 'file://' + imageDate }} style={{ width: '90%', height: 200 }}></Image>)}
            <TouchableOpacity
              style={{
                width: '50%',
                height: 50,
                borderWidth: 1,
                alignSelf: 'center',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => {
                settakePhotoClicked(true);
              }}
            >
              <Text> Click Photo</Text>
            </TouchableOpacity>
          </View>
        )}


    </View>
  )
}