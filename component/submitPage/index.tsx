import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SubmissionPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../images/checkmark.png')} style={styles.checkmarkImage} />
      <Text style={styles.heading}>Thank you!</Text>
      <Text style={styles.subHeading}>Your inspection is under review.</Text>
      <Text style={styles.infoText}>You will receive an email and SMS notification regarding the status of your inspection.</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#009a5a',
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default SubmissionPage;
