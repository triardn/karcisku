import React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';

function Login({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <Text>Hallo Login!</Text>
    </View>
  );
}

export default Login;
