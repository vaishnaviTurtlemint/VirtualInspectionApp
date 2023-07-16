import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, Image, PermissionsAndroid, Platform, } from 'react-native';
import { TextInput } from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import { PostWithJson, getVehicleDetails } from '../../services/APICallIntegration';

interface VehicleDetailsFormProps {
  navigation: any;
}

interface VehicleInfo {
  regNo: string;
  engineNo: string;
  chassisNo: string;
}


const VehicleDetailsForm: React.FC<VehicleDetailsFormProps> = ({ navigation }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [registrationNo, setRegistrationNo] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [engineNo, setEngineNo] = useState<string>('');
  const [chassisNo, setChassisNo] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [vehicleData, setVehicleData] = useState<Map<string, VehicleInfo>>(() => {
    const vehicleDetails: { [key: string]: VehicleInfo } = {
      'MH14KL2508': {
        regNo: 'MH-14-KL-2508',
        engineNo: 'AF217268062',
        chassisNo: 'MB8DP12DLN8E05540',
      },
      'KA52M5083': {
        regNo: 'KA-52-M-5083',
        engineNo: 'D4FBFM415389',
        chassisNo: 'MALC381ULFM031859J',
      },
      'UP82U8383': {
        regNo: 'UP-82-U-8383',
        engineNo: 'GPE4A77064',
        chassisNo: 'MA1PS2GPKE5A46233',
      },
      'MH01AD1234': {
        regNo: 'MH-01-AD-1234',
        engineNo: 'GPE4A77064',
        chassisNo: 'MA1PS2GPKE5A46233',
      }
    };

    return new Map(Object.entries(vehicleDetails));
  });

  const isFormValid = registrationNo && engineNo && chassisNo;


  useEffect(() => {
    // Request permission to access geolocation
    requestLocationPermission();
  }, [isFormValid]);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonPositive: 'OK'
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position: any) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error: any) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    const fetchEngineAndChassisData = async () => {
      if (registrationNo) {
        // let data: VehicleInfo | undefined = vehicleData.get(registrationNo.toUpperCase());
        // let regNo = data!.regNo
        // await getVehicleDetails(regNo).then((response) => {
        //   setEngineNo(response.engineNum);
        //   setChassisNo(response.chassisNum);
        // }).catch((err) => {
        //   setErrorMessage('Data not found for the provided registration number...');
        //   console.log('Data not found for the provided registration number', err);
        // })
        let data: VehicleInfo | undefined = vehicleData.get(registrationNo.toUpperCase());
        if (data) {
          setErrorMessage('');
          setEngineNo(data.engineNo);
          setChassisNo(data.chassisNo);
        } else {
          // Handle the case when the data is undefined
          setErrorMessage('Data not found for the provided registration number');
          console.log('Data not found for the provided registration number');
        }
      }
    };

    fetchEngineAndChassisData();
  }, [registrationNo]);

  const handleInputChange = (value: string, stateSetter: React.Dispatch<React.SetStateAction<string>>) => {
    stateSetter(value);
  };


  const submitVehicleDetails = () => {
    let data = {
      engineNumber: engineNo,
      chassisNumber: chassisNo,
      registrationNumber: registrationNo,
      latitude: latitude,
      longitude: longitude
    }
    PostWithJson('initiate-inspection', data).then((response) => {
      if (response.status == 200) {

        console.log('====================================', response);
        const transactionId = response.data.transactionId; // Replace with the actual transactionId

        navigation.navigate('CameraAllClick', { transactionId })
      }
    }).catch((error) => {
      console.log('====================================', error);
    });

  }

  return (
    <View style={{ flex: 1 }}>
      <Image
        style={{
          alignSelf: 'center',
          width: 150,
          height: 150,
          resizeMode: 'contain',
          tintColor: '#009a5a',
          marginVertical: 20,
        }}
        source={require('../../images/turtlemint.png')}
      />
      <Text style={{ color: '#009a5a', fontSize: 15, fontWeight: 'bold', marginVertical: 20, textAlign: 'center' }}>
        {registrationNo ? 'Please confirm your vehicle details' : 'Please provide your registration number'}     </Text>
      <View style={{ paddingHorizontal: 20 }}>
        <TextInput
          style={styles.input}
          autoFocus
          maxLength={10}
          label="Registration Number"
          placeholder="Registration Number"
          mode="outlined"
          outlineColor="#009a5a"
          value={registrationNo}
          autoCapitalize="characters"
          onChangeText={(value) => handleInputChange(value, setRegistrationNo)}
        />
        {errorMessage && errorMessage.length > 0 && <Text style={{ color: '#FF0000', fontSize: 15, fontWeight: 'bold', marginVertical: 20, textAlign: 'center' }}>
          {errorMessage}</Text>}

        {engineNo && chassisNo && (
          <>
            <TextInput
              style={styles.input}
              autoFocus
              maxLength={10}
              label="Engine Number"
              placeholder="Engine Number"
              mode="outlined"
              outlineColor="#009a5a"
              autoCapitalize="characters"
              value={engineNo}
              onChangeText={(value) => handleInputChange(value, setEngineNo)}
            />

            <TextInput
              style={styles.input}
              autoFocus
              maxLength={10}
              label="Chassis Number"
              placeholder="Chassis Number"
              autoCapitalize="characters"
              mode="outlined"
              outlineColor="#009a5a"
              value={chassisNo}
              onChangeText={(value) => handleInputChange(value, setChassisNo)}
            />
          </>
        )}
      </View>
      {isFormValid && <View>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 20,
          padding: 30,
          color: '#000000'
        }}>This app requires access to your location for Inspection.</Text>
      </View>}

      <View style={{ width: '100%', position: 'absolute', bottom: 20, paddingHorizontal: 20 }}>
        <Button
          disabled={!isFormValid}
          title="Submit"
          color={isFormValid ? '#009a5a' : '#808080'}
          onPress={() => {
            submitVehicleDetails()
          }}
        />
      </View>
    </View >
  );
};


const styles: any = {
  input: {
    height: 55,
    backgroundColor: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
};


export default VehicleDetailsForm;
