import React from 'react';
import {View, Image} from 'react-native';
import {styles} from './styles';

function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/karcisku.png')} />
      </View>
    </View>
  );
}

export default SplashScreen;
