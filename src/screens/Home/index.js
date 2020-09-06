import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import data from './data.json';

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

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', marginTop: 50, marginLeft: 20}}>
        <FAIcon name="user-circle" size={50} color="#8B0000" />
        <View
          style={{
            marginLeft: 20,
            // alignItems: 'center',
            // justifyContent: 'center',
          }}>
          <Text style={{fontSize: 20}}>Hi, Raisa</Text>
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
