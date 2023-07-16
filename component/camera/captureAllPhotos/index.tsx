import React, { useEffect, useRef, useState } from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import RNFS from 'react-native-fs';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  PermissionsAndroid
} from 'react-native';
import { submitFormData, PostWithJson } from '../../../services/APICallIntegration';

type CameraClickProps = {
  transactionId: string

};

type InstructionsMap = {
  [key: string]: string;
};

const instructionsMap: InstructionsMap = {
  front: 'Capture photo from the front',
  rear: 'Capture photo from the rear',
  left: 'Capture photo from the left side',
  right: 'Capture photo from the right side',
  'front Left': 'Capture photo from the front left',
  'front Right': 'Capture photo from the front right',
  'rear Left': 'Capture photo from the rear left',
  'rear Right': 'Capture photo from the rear right',
};

export default function CameraAllClick({ route, navigation }): JSX.Element {
  const { transactionId } = route.params;
  const camera = useRef<Camera | null>(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const [imageData, setImageData] = useState<string[]>([]);
  const [takePhotoClicked, setTakePhotoClicked] = useState<boolean>(false);
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
  const [showButtons, setShowButtons] = useState<boolean>(true);
  const [buttonStates, setButtonStates] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    checkPermission();
    console.log('====================================');
    console.log(transactionId);
    console.log('====================================');
  }, []);

  const checkPermission = async () => {
    const cameraPermission = await Camera.requestCameraPermission();
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Storage permission granted');
    } else {
      console.log('Storage permission denied');
    }
    console.log('Camera Permission:', cameraPermission);
  };

  const takePicture = async () => {
    if (camera != null && camera.current != null) {      
      const photo = await camera.current.takePhoto();
      const currentPhotoName = currentPhoto!.replace(/ /g, '_'); // Replace spaces with underscores in the photo name
      const fileName = currentPhotoName + '.jpg'; // Add the file extension
      const destPath = '/storage/emulated/0/Download/' + fileName; // Update with your desired custom file path
      const fileExists = await RNFS.exists(destPath);
      if (fileExists) {
        await RNFS.unlink(destPath);
        console.log('File deleted successfully');
      } 
      await RNFS.copyFile(photo.path, destPath);
      console.log('Photo Path, destination :', photo.path, destPath);
      setImageData((prevImageData) => [...prevImageData, destPath]);
      setShowButtons(true);
      setCurrentPhoto(null);
      setButtonStates((prevButtonStates) => ({ ...prevButtonStates, [currentPhoto!]: true }));
      setTakePhotoClicked(false);
    }
  };

  const renderCameraView = () => {
    return (
      <View style={{ flex: 1 }}>
        <Camera ref={camera} style={StyleSheet.absoluteFill} device={device} isActive={true} photo={true}></Camera>
        {currentPhoto && (
          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePicture}
            disabled={currentPhoto === null}
          >
            <Text style={styles.captureButtonText}>Capture {currentPhoto.charAt(0).toUpperCase() + currentPhoto.slice(1)}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderImageView = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {imageData.map((path, index) => (
          <Image key={index} source={{ uri: 'file://' + path }} style={{ width: '90%', height: 200 }} />
        ))}
      </View>
    );
  };

  if (!devices.back) return <ActivityIndicator />;

  const submitPhotoForProcess = async () => {
    try {
       for (let i = 0; i < imageData.length; i++) {
        const imageUri = imageData[i];
        const formData = new FormData();
        const lastSlashIndex = imageUri.lastIndexOf('/');
        const imageName = imageUri.substring(lastSlashIndex + 1);

        formData.append('image', {
          uri: 'file://'+ imageUri,
          type: 'image/jpeg',
          name: imageName,
        });

        formData.append('transactionId', transactionId);
        formData.append('extension', '.jpg');
        formData.append('context', imageName);

        submitFormData(formData).then((response) => {
          console.log('==================================== response', response);
        }).catch((err) => {
          console.log('====================================err', err);
        });

      }

      setImageData([]);
      PostWithJson('process-inspection', {'transactionId': transactionId}).then((response)=> {
        console.log('====================================');
        console.log('process inspection started', response);
        console.log('====================================');
      })
      navigation.navigate('SubmissionPage')
    } catch (error) {
      console.error('Error submitting photo for processing:', error);
    }
  };

  return (
    <View style={takePhotoClicked ? styles.cameracontainer : styles.container}>
      {!takePhotoClicked && <View style={styles.header}>
        <Image
          style={{
            left: 200,
            width: 150,
            padding: 10,
            resizeMode: 'contain',
            tintColor: '#009a5a',
          }}
          source={require('../../../images/turtlemint.png')}
        />
        <Text style={styles.headerText}>Please capture photo as per camera angle instruction.  </Text>
      </View>}

      {takePhotoClicked ? (
        renderCameraView()
      ) : (
          renderImageView()
        )}

      {showButtons && (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.buttonContainer}>
            {Object.keys(instructionsMap).map((photoKey) => (
              <View key={photoKey} style={styles.buttonWrapper}>
                <Text style={styles.instructionsText}>{instructionsMap[photoKey]}</Text>
                <TouchableOpacity
                  style={[
                    styles.button,
                    buttonStates[photoKey] ? styles.buttonDisabled : null,
                  ]}
                  onPress={() => {
                    setTakePhotoClicked(true);
                    setShowButtons(false);
                    setCurrentPhoto(photoKey);
                  }}
                  disabled={buttonStates[photoKey]}
                >
                  <Text style={styles.buttonText}>{photoKey.charAt(0).toUpperCase() + photoKey.slice(1)}</Text>
                </TouchableOpacity>

              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {showButtons && (
        <TouchableOpacity
          disabled={ imageData.length === Object.keys(instructionsMap).length ? false: true}
          style={imageData.length === Object.keys(instructionsMap).length ? styles.submitButton : styles.submitButton1}
          onPress={() => {
            submitPhotoForProcess();
          }}
        >
          <Text style={styles.submitButtonText}>Process Inspection</Text>
        </TouchableOpacity>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  cameracontainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6F8',
    marginBottom: 50
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    marginTop: 20
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000'
  },
  buttonDisabled: {
    backgroundColor: '#009a5a',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    width: '50%',
  },
  button: {
    width: '100%',
    height: 60,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructionsText: {
    color: '#000000',
    fontSize: 13,
    marginBottom: 8,
    textAlign: 'center',
  },
  captureButton: {
    width: '50%',
    height: 50,
    borderRadius: 30,
    backgroundColor: '#009a5a',
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center'
  },
  captureButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    width: '70%',
    height: 50,
    backgroundColor: '#009a5a',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  submitButton1: {
    width: '70%',
    height: 50,
    backgroundColor: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  CameraClick: {
    width: 200,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#009a5a',
    position: "absolute",
    bottom: 50,
    alignSelf: "center"
  },
  CameraClickButton: {
    padding: 20,
    alignSelf: "center",
    color: '#000000',
  }
});
