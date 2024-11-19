import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Settings = () => {
  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          source={require('../../utils/animation3.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>Ugh, settings? Really?</Text>
        <Text style={styles.subText}>Let's just dance instead! 😜</Text>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  animationContainer: {
    marginBottom: 40, // Animation and text separation
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 250,
    height: 400,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 20,
    color: '#007AFF', // Playful blue to match Morty's vibe
    textAlign: 'center',
  },
});
