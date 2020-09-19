import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

const PaymentSummary = ({route, navigation}) => {
  const summary = route.params.summary;

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
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
      }}>
      <View>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>Payment Summary</Text>
      </View>
      <View style={{marginVertical: 20}}>
        <Image
          source={require('../../assets/logos/bca-logo.png')}
          style={{width: 200, height: 100}}
        />
        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 22}}>
          1234 567 8912
        </Text>
      </View>
      <View style={{marginVertical: 20}}>
        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 18}}>
          {formatCurrency(summary.totalPay)}
        </Text>
        <Text>*Complete payment instruction has been sent to your email</Text>
      </View>
      <View style={{marginVertical: 20}}>
        <TouchableOpacity
          style={{
            width: 350,
            height: 40,
            backgroundColor: '#8B0000',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            })
          }>
          <Text style={{fontSize: 20, color: '#ffffff', fontWeight: 'bold'}}>
            Back to Homepage
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentSummary;
