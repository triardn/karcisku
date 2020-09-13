import React, {useEffect} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {styles} from './styles';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Asyncstorage from '@react-native-community/async-storage';

//data yang akan digunakan dalam onboarding
const slides = [
  {
    key: 1,
    title: 'Proses Transaksi Cepat',
    text: 'Proses transaksi tidak lebih dari 3 menit',
    image: require('../../assets/images/working-time.png'),
    icon: 'clock-fast',
  },
  {
    key: 2,
    title: 'Platform Terpercaya',
    text: 'Sudah melayani pemesanan event > 5 tahun',
    image: require('../../assets/images/research.png'),
    icon: 'seal-variant ',
  },
  {
    key: 3,
    title: 'Banyak Diskon Menanti',
    text: 'Banyak diskon yang bisa anda dapatkan dengan register di Karcisku',
    image: require('../../assets/images/venture.png'),
    icon: 'brightness-percent',
  },
  {
    key: 4,
    title: 'Digital Download',
    text: 'Anda bisa menikmati rekaman acara yg sudah lewat',
    image: require('../../assets/images/money-bag.png'),
    icon: 'video-plus-outline',
  },
];

const OnBoarding = ({navigation}) => {
  //menampilkan data slides kedalam renderItem
  const renderItem = ({item}) => {
    let iconName = '';
    switch (item.key) {
      case 1:
        iconName = 'clock-fast';
        break;
      case 2:
        iconName = 'seal-variant';
        break;
      case 3:
        iconName = 'brightness-percent';
        break;
      case 4:
        iconName = 'video-plus-outline';
        break;
      default:
        iconName = 'clock-fast';
    }

    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <MaterialIcon
          name={iconName}
          size={250}
          style={{alignSelf: 'center', marginVertical: 30}}
          color="#8B0000"
        />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  useEffect(() => {
    const isSkipIntro = async () => {
      try {
        const x = await Asyncstorage.getItem('skip-intro');
        if (x === 'true') {
          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        }
      } catch (err) {
        console.log('error when get item: ', err);
      }
    };

    isSkipIntro();

    return () => {
      return Asyncstorage.setItem('skip-intro', 'true');
    };
  }, []);

  //fungsi ketika onboarding ada di list terakhir atau screen terakhir / ketika button done di klik
  const onDone = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  //mengcustom tampilan button done
  const renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          onPress={() => onDone()}
        />
      </View>
    );
  };

  //mengcustom tampilan next button
  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="arrow-forward" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={{flex: 1, marginTop: 200}}>
        {/* merender atau menjalankan library react-native-app-intro-slider */}
        <AppIntroSlider
          data={slides}
          onDone={onDone}
          renderItem={renderItem}
          renderDoneButton={renderDoneButton}
          renderNextButton={renderNextButton}
          keyExtractor={(item, index) => index.toString()}
          activeDotStyle={{backgroundColor: '#8B0000'}}
        />
      </View>
    </View>
  );
};

export default OnBoarding;
