import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {styles} from './styles';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import data from './data.json';

import Axios from 'axios';
import Asyncstorage from '@react-native-community/async-storage';
import api from '../../api/index';
import {GoogleSignin, statusCode} from '@react-native-community/google-signin';

const Home = ({navigation}) => {
  const formatCurrency = (number) => {
    if (number !== 'Free') {
      number = parseInt(number);
      return (
        'Rp ' + number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      );
    }

    return number;
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          marginTop: 10,
          marginLeft: 20,
          marginRight: 20,
          flexDirection: 'row',
          borderWidth: 3,
          borderRadius: 10,
          borderColor: '#8B0000',
          paddingHorizontal: 10,
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View />
        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.title}</Text>
          <Text style={{fontSize: 16}}>{item.author}</Text>
          <Text>{item.date}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.place}</Text>
          <Text style={{fontSize: 16}}>{formatCurrency(item.price)}</Text>
        </View>
      </View>
    );
  };

  const [userInfo, setUserInfo] = useState('');
  const [isUsingGoogle, setIsUsingGoogle] = useState(false);

  useEffect(() => {
    async function getToken() {
      try {
        const token = await Asyncstorage.getItem('token');
        // return getVenue(token);
      } catch (err) {
        showToast('Gagal mengambil token');
        console.log('getToken -> err', err);
      }
    }
    getToken();
    if (isUsingGoogle) {
      getCurrentUser();
    }
  }, []);

  const getCurrentUser = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setUserInfo(userInfo);
    } catch (err) {
      showToast('Gagal melakukan fetch data user');
      console.log('getCurrentUser -> err', err);
    }
  };

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getVenue = (token) => {
    Axios.get(`${api}/venues`, {
      timeout: 20000,
      headers: {
        Authorization: 'Bearer' + token,
      },
    })
      .then((res) => {
        console.log('getVenue -> resp', res);
      })
      .catch((err) => {
        showToast('Gagal melakukan fetch data venues. Silakan cek log');
        console.log('getVenue -> err', err);
      });
  };

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    setIsUsingGoogle(isSignedIn);
  };

  const logout = async () => {
    try {
      if (isUsingGoogle) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      } else {
        await Asyncstorage.removeItem('token');
      }

      showToast('Sukses logout dari aplikasi');

      navigation.navigate('Login');
    } catch (err) {
      showToast('Gagal logout. Silakan coba beberapa saat lagi');
      console.log('onLogoutPress -> err', err);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 50,
          marginLeft: 20,
          marginRight: 20,
        }}>
        <FAIcon name="user-circle" size={50} color="#8B0000" />
        <View
          style={{
            marginLeft: 20,
          }}>
          <Text style={{fontSize: 20}}>Hi, {userInfo.name}</Text>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              backgroundColor: '#8B0000',
              alignItems: 'center',
              marginTop: 5,
              height: 20,
            }}
            onPress={() => navigation.navigate('Profile')}>
            <Text style={{color: 'white'}}>Edit profile</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <MCIcon
            name="logout-variant"
            size={50}
            color="#8B0000"
            onPress={() => logout()}
          />
        </View>
      </View>
      <View style={{marginTop: 20}}>
        <FlatList
          data={data.events}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default Home;
