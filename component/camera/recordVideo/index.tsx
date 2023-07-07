import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import RNFS  from 'react-native-fs';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  PermissionsAndroid,
  } from 'react-native';

export default function RecordVideo({ navigation }: any): JSX.Element {
  const camera = useRef<Camera | null>(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const [startVideo, setStartVideo] = useState(false);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)

    if (cameraPermission !== 'authorized') {
      const newCameraPermission = await Camera.requestCameraPermission();
      const newMicrophonePermission = await Camera.requestMicrophonePermission()

      console.log('newCameraPermission, newMicrophonePermission', newCameraPermission, newMicrophonePermission);
    }
    await Camera.getMicrophonePermissionStatus();
  };

  const stopRecording = useCallback(() => {
    if (!camera.current) throw new Error('Camera ref is null!');
    camera.current.stopRecording();
  }, [camera]);

  const startVideoRecord = useCallback(() => {
    try {
      const customFilePath = '/storage/emulated/0/Download/testgerger.mp4'; // Update with your desired custom file path

      if (!camera.current) throw new Error('Camera ref is null!');

      console.log('calling startRecording()...');
      camera.current.startRecording({
        flash: 'off',
        onRecordingError: (error: any) => {
          console.error('Recording failed!', error);
          camera.current!.stopRecording();
        },
        onRecordingFinished: async (video: any) => {
          console.log(`Recording successfully finished! ${video.path}`);
          await RNFS.copyFile(video.path, customFilePath)
            .then(() => {
              console.log(`Moved recording to custom file path: ${customFilePath}`);
              // Handle the recording file as needed
            })
            .catch((error) => {
              console.error('Error moving the recording file:', error);
            });
          camera.current!.stopRecording();
        },
      });
      // TODO: wait until startRecording returns to actually find out if the recording has successfully started
      console.log('called startRecording()!');
    } catch (error) {
      console.error('failed to start recording!', error, 'camera');
    }
  }, [camera]);

  if (!device) return <ActivityIndicator />;

  return (
    <View style={{ flex: 1 }}>
      {startVideo ? (
        <View style={{ flex: 1 }}>
          <Camera ref={camera} style={StyleSheet.absoluteFill} device={device} isActive={true} video={true} audio />
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#FF0037',
              position: 'absolute',
              bottom: 50,
              alignSelf: 'flex-start',
            }}
            onPress={() => {
              startVideoRecord();
            }}
          />
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#FFFFFF',
              position: 'absolute',
              bottom: 50,
              alignSelf: 'flex-end',
            }}
            onPress={() => {
              stopRecording();
            }}
          />
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              width: '50%',
              height: 50,
              borderWidth: 1,
              alignSelf: 'center',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setStartVideo(true);
            }}
          >
            <Text>Record Video</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
