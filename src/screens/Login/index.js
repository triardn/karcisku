import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
  Button,
} from 'react-native';
import {styles} from './styles';

import Axios from 'axios';
import Asyncstorage from '@react-native-community/async-storage';
import api from '../../api/index';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import TouchID from 'react-native-touch-id';

const config = {
  title: 'Authentication Required',
  imageColor: '#8B0000',
  imageErrorColor: 'red',
  sensorDescription: 'Touch Sensor',
  sensorErrorDescription: 'Login Failed',
  cancelText: 'Cancel',
};

function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const saveToken = async (token) => {
    try {
      await Asyncstorage.setItem('token', token);
      await Asyncstorage.setItem('username', email);
    } catch (err) {
      showToast('Gagal menyimpan token');
      console.log(err);
    }
  };

  const setLoginFlag = async () => {
    try {
      await Asyncstorage.setItem('isLogin', 'true');

      if (email != null || email !== '') {
        await Asyncstorage.setItem('username', email);
      }
    } catch (err) {
      console.log('setLoginFlag -> err: ', err);
    }
  };

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      offlineAccess: false,
      webClientId:
        '986703949408-aeoum73ghjh1p7o04mkl8iscv0lo6aff.apps.googleusercontent.com',
    });
  };

  const signInWithGoogle = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(idToken);

      auth().signInWithCredential(credential);

      setLoginFlag();

      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } catch (err) {
      showToast('Gagal login dengan Google. Silakan coba beberapa saat lagi');
      console.log('signInWithGoogle -> err', err);
    }
  };

  const onLoginPress = () => {
    return auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setLoginFlag();

        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      })
      .catch((err) => {
        console.log('onLoginPress -> err: ', err);
      });
  };

  const signInWithFingerPrint = () => {
    TouchID.authenticate('', config)
      .then((success) => {
        setLoginFlag();

        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      })
      .catch((err) => {
        console.log('login -> res', err);
      });
  };

  return (
    <View style={styles.container} backgroundColor="#ffffff">
      <StatusBar backgroundColor="grey" barStyle="light-content" />
      <View style={styles.loginContainer}>
        <Image
          source={require('../../assets/images/karcisku-logo.png')}
          style={{width: 250, height: 250, alignSelf: 'center', marginTop: 30}}
        />
        <View style={styles.inputContainer}>
          <View style={styles.inputItem}>
            <Text>Username</Text>
            <TextInput
              style={styles.loginInput}
              placeholder="Username or Email"
              value={email}
              onChangeText={(email) => setEmail(email)}
            />
          </View>
          <View style={styles.inputItem}>
            <Text>Password</Text>
            <TextInput
              style={styles.loginInput}
              secureTextEntry={true}
              placeholder="Password"
              value={password}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => onLoginPress()}>
            <Text style={styles.buttonLoginText}>LOGIN</Text>
          </TouchableOpacity>
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}> OR </Text>
            <View style={styles.separatorLine} />
          </View>
          <GoogleSigninButton
            style={styles.buttonGoogleSignin}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => signInWithGoogle()}
          />
          <Button
            style={styles.buttonFingerPrintSignin}
            color="#924444"
            title="Sign in with Finger Print"
            onPress={() => signInWithFingerPrint()}
          />
        </View>
        <View style={styles.notHaveAccountContainer}>
          <Text style={styles.textCenter}>
            Belum mempunyai akun?{' '}
            <Text
              style={styles.textColorBlue}
              onPress={() => navigation.navigate('Register')}>
              Buat Akun
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Login;
