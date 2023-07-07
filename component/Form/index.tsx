import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, Image } from 'react-native';
import { TextInput } from 'react-native-paper';

interface VehicleDetailsFormProps {
  navigation: any;
}

const VehicleDetailsForm: React.FC<VehicleDetailsFormProps> = ({ navigation }) => {
  const [registrationNo, setRegistrationNo] = useState<string>('');
  const [engineNo, setEngineNo] = useState<string>('');
  const [chassisNo, setChassisNo] = useState<string>('');

  const handleInputChange = (value: string, stateSetter: React.Dispatch<React.SetStateAction<string>>) => {
    stateSetter(value);
  };

  const isFormValid = registrationNo && engineNo && chassisNo;

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
        Please provide the necessary information about the vehicle below.
      </Text>
      <View style={{ paddingHorizontal: 20 }}>
        <TextInput
          style={styles.input}
          autoFocus
          maxLength={10}
          placeholder="Registration Number"
          mode="outlined"
          outlineColor="#009a5a"
          value={registrationNo}
          onChangeText={(value) => handleInputChange(value, setRegistrationNo)}
        />

        <TextInput
          style={styles.input}
          autoFocus
          maxLength={10}
          placeholder="Engine Number"
          mode="outlined"
          outlineColor="#009a5a"
          value={engineNo}
          onChangeText={(value) => handleInputChange(value, setEngineNo)}
        />

        <TextInput
          style={styles.input}
          autoFocus
          maxLength={10}
          placeholder="Chassis Number"
          mode="outlined"
          outlineColor="#009a5a"
          value={chassisNo}
          onChangeText={(value) => handleInputChange(value, setChassisNo)}
        />
      </View>

      <View style={{ width: '100%', position: 'absolute', bottom: 20, paddingHorizontal: 20 }}>
        <Button
          disabled={!isFormValid}
          title="Submit"
          color={isFormValid ? '#009a5a' : '#808080'}
          onPress={() => {
            // Handle form submission
          }}
        />
      </View>
    </View>
  );
};

const styles: any = {
  input: {
    height: 48,
    backgroundColor: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
};

export default VehicleDetailsForm;
