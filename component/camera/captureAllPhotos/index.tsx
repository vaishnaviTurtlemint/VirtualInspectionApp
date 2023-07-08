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
  TouchableOpacity,
  Image
} from 'react-native';

type CameraClickProps = {
  navigation: any;
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

export default function CameraClick({ navigation }: CameraClickProps): JSX.Element {
  const camera = useRef<Camera | null>(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const [imageData, setImageData] = useState<string[]>([]);
  const [takePhotoClicked, setTakePhotoClicked] = useState<boolean>(false);
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
  const [showButtons, setShowButtons] = useState<boolean>(true);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const cameraPermission = await Camera.requestCameraPermission();
    console.log('Camera Permission:', cameraPermission);
  };

  const takePicture = async () => {
    if (camera != null && camera.current != null) {
      const photo = await camera.current.takePhoto();
      console.log('Photo Path:', photo.path);
      setImageData((prevImageData) => [...prevImageData, photo.path]);
      setShowButtons(true);
      setCurrentPhoto(null);
    }
  };

  const renderCameraView = () => {
    return (
      <View style={{ flex: 1 }}>
        <Camera ref={camera} style={StyleSheet.absoluteFill} device={device} isActive={true} photo={true}></Camera>
        <TouchableOpacity
          style={styles.CameraClick}
          onPress={takePicture}
        >
          <Text style={styles.CameraClickButton}>Capture Photo</Text>
        </TouchableOpacity>
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Please capture below angle photo and submit</Text>
      </View>

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
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setTakePhotoClicked(true);
                    setShowButtons(false);
                    setCurrentPhoto(photoKey);
                  }}
                >
                  <Text style={styles.buttonText}>{photoKey.charAt(0).toUpperCase() + photoKey.slice(1)}</Text>
                </TouchableOpacity>
                <Text style={styles.instructionsText}>{instructionsMap[photoKey]}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {imageData.length === Object.keys(instructionsMap).length && (
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            console.log('Submit All Photos');
          }}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6F8',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
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
    backgroundColor: '#009a5a',
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
    color: '#777',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  captureButton: {
    width: '50%',
    height: 50,
    backgroundColor: '#009a5a',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
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
