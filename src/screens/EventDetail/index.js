import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

const EventDetail = ({route, navigation}) => {
  const event = route.params.event;

  const formatCurrency = (number) => {
    if (number !== 'Free') {
      number = parseInt(number);
      return (
        'Rp ' + number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      );
    }

    return number;
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{marginTop: 50, marginBottom: 10, alignItems: 'center'}}>
          <Image
            source={{uri: 'https://picsum.photos/id/237/200/300'}}
            style={{width: 200, height: 200}}
          />
        </View>
        <View style={{alignItems: 'center', marginTop: 10, marginBottom: 10}}>
          <Text style={{fontSize: 30, fontWeight: 'bold', marginVertical: 5}}>
            {event.title}
          </Text>
          <Text style={{fontSize: 22, fontWeight: 'bold', marginVertical: 5}}>
            {event.author}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 50,
            marginRight: 50,
          }}>
          <View style={{marginVertical: 5}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              Event Description:
            </Text>
            <Text style={{fontSize: 16}}>{event.description}</Text>
          </View>

          <View style={{marginVertical: 5}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>Location:</Text>
            <Text style={{fontSize: 16}}>{event.place}</Text>
          </View>

          <View style={{marginVertical: 5}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              Ticket Price:
            </Text>
            <Text style={{fontSize: 16}}>{formatCurrency(event.price)}</Text>
          </View>

          <View style={{marginVertical: 5}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              Tickets Remaining:
            </Text>
            <Text style={{fontSize: 16}}>{event.stock}</Text>
          </View>
        </View>
        <View style={{marginTop: 10, alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              width: 350,
              height: 40,
              backgroundColor: '#8B0000',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 20, color: '#ffffff', fontWeight: 'bold'}}>
              Buy Ticket
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EventDetail;
