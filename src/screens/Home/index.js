import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
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
  const [userInfo, setUserInfo] = useState('');
  const [username, setUsername] = useState('');
  const [isUsingGoogle, setIsUsingGoogle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      try {
        const userInfo = await GoogleSignin.signInSilently();
        setUserInfo(userInfo);
        setIsUsingGoogle(true);
        setIsLoading(false);
      } catch (err) {
        const username = await Asyncstorage.getItem('username');
        setUsername(username);

        setIsLoading(false);
      }
    }
    getUserData();
  }, []);

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const logout = async () => {
    try {
      if (isUsingGoogle === true) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      } else {
        await Asyncstorage.removeItem('token');
        await Asyncstorage.removeItem('username');
      }

      showToast('Sukses logout dari aplikasi');

      navigation.navigate('Login');
    } catch (err) {
      showToast('Gagal logout. Silakan coba beberapa saat lagi');
      console.log('onLogoutPress -> err', err);
    }
  };

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

  //  If load data
  if (isLoading) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <ActivityIndicator size="large" color="maroon" />
      </View>
    );
  }

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
          <Text style={{fontSize: 20}}>
            Hi,{' '}
            {userInfo && userInfo.user && userInfo.user.name
              ? userInfo.user.name
              : username
              ? username
              : 'Login by Touch-ID'}
          </Text>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              backgroundColor: '#8B0000',
              alignItems: 'center',
              marginTop: 5,
              height: 23,
              width: 100,
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
