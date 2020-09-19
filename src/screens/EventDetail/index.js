import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RadioButton} from 'react-native-paper';

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

  const [ticketCounter, setTicketCounter] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('bca');
  const [isLoading, setIsLoading] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const incCounter = () => {
    setTicketCounter(ticketCounter + 1);
  };

  const decCounter = () => {
    setTicketCounter(ticketCounter - 1);
  };

  const purchase = () => {
    setIsLoading(true);

    const uniqueCode = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    const baseAmount = parseInt(event.price, 10);
    const totalAmount = baseAmount * ticketCounter + uniqueCode;

    let summary = {
      event: event,
      tickets: ticketCounter,
      baseAmount: baseAmount,
      totalAmount: baseAmount * ticketCounter,
      uniqueCode: uniqueCode,
      totalPay: totalAmount,
    };

    console.log(summary);
  };

  if (isLoading) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <ActivityIndicator size="large" color="maroon" />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection={['down']}
        supportedOrientations={['portrait', 'landscape']}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 22,
            borderRadius: 4,
            borderColor: 'rgba(0, 0, 0, 0.1)',
          }}>
          <Text
            style={{
              fontSize: 24,
              marginBottom: 20,
              alignSelf: 'center',
              fontWeight: 'bold',
            }}>
            {event.title}
          </Text>
          <View style={{flexDirection: 'row', marginHorizontal: 50}}>
            <View>
              <Text style={{fontSize: 20}}>Quantity: </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => decCounter()}
                  disabled={ticketCounter === 0 ? true : false}>
                  <Icon name="minus-circle" size={20} color="#8B0000" />
                </TouchableOpacity>

                <Text style={{fontSize: 20, marginHorizontal: 10}}>
                  {ticketCounter}
                </Text>

                <TouchableOpacity
                  onPress={() => incCounter()}
                  disabled={ticketCounter === event.max_trx ? true : false}>
                  <Icon name="plus-circle" size={20} color="#8B0000" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 20,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 50,
              }}>
              <RadioButton
                value="bca"
                status={selectedPayment === 'bca' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedPayment('bca')}
                color="#8B0000"
              />
              <Text>BCA</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 50,
              }}>
              <RadioButton
                value="mandiri"
                status={selectedPayment === 'mandiri' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedPayment('mandiri')}
                color="#8B0000"
                disabled={true}
              />
              <Text>Mandiri</Text>
            </View>
          </View>

          <Button color="#8B0000" title="Purchase" onPress={() => purchase()} />
        </View>
      </Modal>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{marginTop: 50, marginBottom: 10, alignItems: 'center'}}>
          <Icon name="image-outline" color="#8B0000" size={180} />
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
          <View style={{marginVertical: 3}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              Event Description:
            </Text>
            <Text style={{fontSize: 16}}>{event.description}</Text>
          </View>

          <View style={{marginVertical: 3}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>Location:</Text>
            <Text style={{fontSize: 16}}>{event.place}</Text>
          </View>

          <View style={{marginVertical: 3}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              Ticket Price:
            </Text>
            <Text style={{fontSize: 16}}>{formatCurrency(event.price)}</Text>
          </View>

          <View style={{marginVertical: 3}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              Tickets Remaining:
            </Text>
            <Text style={{fontSize: 16}}>{event.stock}</Text>
          </View>

          <View style={{marginVertical: 3}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              Max Ticket / Transaction:
            </Text>
            <Text style={{fontSize: 16}}>{event.max_trx}</Text>
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
            }}
            onPress={() => toggleModal()}>
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
