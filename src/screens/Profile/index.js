import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ToastAndroid} from 'react-native';
import {styles} from './styles';

import Axios from 'axios';
import Asyncstorage from '@react-native-community/async-storage';
import api from '../../api/index';
import {GoogleSignin, statusCode} from '@react-native-community/google-signin';

const Profile = ({navigation}) => {
  const [userInfo, setUserInfo] = useState('');
  const [username, setUsername] = useState('');
  const [isUsingGoogle, setIsUsingGoogle] = useState(false);

  useEffect(() => {
    async function getUserData() {
      try {
        const uinfo = await GoogleSignin.signInSilently();
        setUserInfo(uinfo);
        setIsUsingGoogle(true);
      } catch (err) {
        const uname = await Asyncstorage.getItem('username');
        setUsername(uname);
      }
    }
    getUserData();
  }, []);

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const onLogoutPress = async () => {
    try {
      if (isUsingGoogle) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      } else {
        await Asyncstorage.removeItem('token');
      }

      navigation.navigate('Login');
    } catch (err) {
      showToast('Gagal logout. Silakan coba beberapa saat lagi');
      console.log('onLogoutPress -> err', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.blueBox} />
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={
              userInfo && userInfo.user && userInfo.user.photo
                ? {uri: userInfo.user.photo}
                : require('../../assets/images/cat.jpg')
            }
            style={styles.image}
          />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {userInfo && userInfo.user && userInfo.user.name
              ? userInfo.user.name
              : username
              ? username
              : 'TouchID User'}
          </Text>
        </View>
      </View>
      <View style={styles.detailProfileContainer}>
        <View style={styles.items}>
          {/* Tanggal Lahir */}
          <View style={styles.item}>
            <View style={styles.flex}>
              <Text>Tangal lahir</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.itemValue}>29 April 1992</Text>
            </View>
          </View>

          {/* Jenis Kelamin */}
          <View style={styles.item}>
            <View style={styles.flex}>
              <Text>Jenis Kelamin</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.itemValue}>Laki - Laki</Text>
            </View>
          </View>

          {/* Hobi */}
          <View style={styles.item}>
            <View style={styles.flex}>
              <Text>Hobi</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.itemValue}>Main game online</Text>
            </View>
          </View>

          {/* No. Telp */}
          <View style={styles.item}>
            <View style={styles.flex}>
              <Text>No. Telp</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.itemValue}>0852-1216-8410</Text>
            </View>
          </View>

          {/* Email */}
          <View style={styles.item}>
            <View style={styles.flex}>
              <Text>Email</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.itemValue}>
                {userInfo && userInfo.user && userInfo.user.email
                  ? userInfo.user.name
                  : username
                  ? username
                  : 'Login by Touch-ID'}
              </Text>
            </View>
          </View>
        </View>
        {/* <TouchableOpacity
          style={styles.buttonLogout}
          onPress={() => onLogoutPress()}>
          <Text style={styles.textWhite}>LOGOUT</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Profile;
