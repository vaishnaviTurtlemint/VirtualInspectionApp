import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { moveFile } from 'react-native-fs';
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
import { log } from 'util';


export default function RecordVideo({ navigation }: any): JSX.Element {
    const camera = useRef(null);
    const devices = useCameraDevices();
    const device = devices.back;
    const [videoData, setvideoData] = useState('');
    const [startVideo, setstartVideo] = useState(false);

    useEffect(() => {
        checkPremission()
    }, [])

    const checkPremission = async () => {
        const cameraPermission = await Camera.getCameraPermissionStatus()
        if (cameraPermission != 'authorized') {
            const newCameraPermission = await Camera.requestCameraPermission()
            console.log("newCameraPermission", newCameraPermission);
        }
    await Camera.getMicrophonePermissionStatus()


    }

    const stopRecording = useCallback(() => {
        if (camera.current == null) throw new Error('Camera ref is null!');
        camera.current.stopRecording()   
    }, [camera]);

    const startVideoRecord = useCallback(() => {
        try {
            const customFilePath = '/storage/emulated/0/Vapp/testgerger.mp4'; // Update with your desired custom file path

          if (camera.current == null) throw new Error('Camera ref is null!');
    
          console.log('calling startRecording()...');
          camera.current.startRecording({
            flash: "off",
            onRecordingError: (error:any) => {
              console.error('Recording failed!', error);
              camera.current.stopRecording()             },
            onRecordingFinished: (video:any) => {
              console.log(`Recording successfully finished! ${video.path}`);
               moveFile(video.path, customFilePath);
            //   onMediaCaptured(video, 'video');
              camera.current.stopRecording()            },
          });
          // TODO: wait until startRecording returns to actually find out if the recording has successfully started
          console.log('called startRecording()!');
        } catch (e) {
          console.error('failed to start recording!', e, 'camera');
        }
      }, [camera]);

    // const startVideoRecord = async () => {
    // console.log("Video Started----->>>>>");

    //     if (camera != null && camera.current != null) {
    //         console.log("Video Started----->>>>> camera.current not nulll");

    //         const video = camera.current.startRecording({
    //             flash: 'off',
    //             onRecordingFinished: (video : any) => console.log("video log",video),
    //             onRecordingError: (error: any) => console.error("video error log",error),
    //           });
    //         console.log('====================================', video);
    //         setstartVideo(false);
    //         // await camera.current.stopRecording()
    //         setvideoData(video);


    //     }

    // }

    if (device == null) return <ActivityIndicator></ActivityIndicator>

    return (
        <View style={{ flex: 1 }}>
            {startVideo ? (<View style={{ flex: 1 }}>
                <Camera ref={camera} style={StyleSheet.absoluteFill} device={device} isActive={true} video={true} audio></Camera>
                <TouchableOpacity
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: '#FF0037',
                        position: "absolute",
                        bottom: 50,
                        alignSelf: "flex-start"
                    }}
                    onPress={() => {
                        startVideoRecord();
                    }}
                ></TouchableOpacity>
                 <TouchableOpacity
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: '#FFFFFF',
                        position: "absolute",
                        bottom: 50,
                        alignSelf: "flex-end"
                    }}
                    onPress={() => {
                        stopRecording();
                    }}
                ></TouchableOpacity>
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
                                alignItems: 'center'
                            }}
                            onPress={() => {
                                setstartVideo(true);
                            }}
                        >
                            <Text> Record Video</Text>
                        </TouchableOpacity>
                    </View>

                )}

        </View>
    )
}