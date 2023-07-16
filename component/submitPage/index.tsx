import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SubmissionPage: React.FC = () => {
  return (
    <View style={{ flex : 1}}>
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
    <View style={styles.container}>
      
      <Image source={require('../../images/checkmark.png')} style={styles.checkmarkImage} />
      <Text style={styles.heading}>Thank you!</Text>
      <Text style={styles.subHeading}>Your inspection is under review.</Text>
      <Text style={styles.infoText}>You will receive an email and SMS notification regarding the status of your inspection.</Text>
    </View>
    

    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  checkmarkImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#009a5a',
  },
  subHeading: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#000000',
    fontWeight: 'bold'
  },
  infoText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000000',
  },
});

export default SubmissionPage;
