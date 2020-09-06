import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  StatusBar,
} from 'react-native';
import {styles} from './styles';

import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/Feather';
import storage from '@react-native-firebase/storage';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

const Register = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState('back');
  const [photo, setPhoto] = useState(null);

  const toggleCamera = () => {
    setType(type === 'back' ? 'front' : 'back');
  };

  const capture = async (camera) => {
    const option = {
      quality: 0.5,
      base64: true,
    };

    if (camera) {
      const data = await camera.takePictureAsync(option);
      setPhoto(data);
      setIsVisible(false);
    }
  };

  const uploadImage = (uri) => {
    const sessionId = new Date().getTime();
    return storage()
      .ref(`image/${sessionId}`)
      .putFile(uri)
      .then((response) => {
        alert('upload success');
      })
      .catch((err) => {
        alert(err);
      });
  };

  const renderCamera = () => {
    let camera = null;
    return (
      <Modal visible={isVisible} onRequestClose={() => setIsVisible(false)}>
        <View style={{flex: 1}}>
          <RNCamera
            style={{flex: 1}}
            type={type}
            ref={(ref) => {
              camera = ref;
            }}>
            <View style={styles.buttonFlipContainer}>
              <TouchableOpacity
                style={styles.buttonFlip}
                onPress={() => toggleCamera()}>
                <MaterialCommunity name="rotate-3d-variant" size={15} />
              </TouchableOpacity>
            </View>
            <View style={styles.round} />
            <View style={styles.rectangle} />
            <View style={styles.buttonCaptureContainer}>
              <TouchableOpacity
                style={styles.buttonCapture}
                onPress={() => capture(camera)}>
                <Icon name="camera" size={30} />
              </TouchableOpacity>
            </View>
          </RNCamera>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.blueBox} />
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={
              photo === null
                ? require('../../assets/images/cat.jpg')
                : {uri: photo.uri}
            }
            style={styles.image}
          />
        </View>
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Text style={styles.name}>Change picture</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.detailProfileContainer}>
        <View style={styles.items}>
          <View style={styles.item}>
            <Text>Name</Text>
            <TextInput
              placeholder="Name"
              value=""
              underlineColorAndroid={'#C6C6C6'}
            />
          </View>
          <View style={styles.item}>
            <Text>Email</Text>
            <TextInput
              placeholder="Email"
              value=""
              underlineColorAndroid={'#C6C6C6'}
            />
          </View>
          <View style={styles.item}>
            <Text>Password</Text>
            <TextInput
              placeholder="Password"
              value=""
              underlineColorAndroid={'#C6C6C6'}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => uploadImage(photo.uri)}>
          <Text style={styles.textWhite}>REGISTER</Text>
        </TouchableOpacity>
      </View>
      {renderCamera()}
    </View>
  );
};

export default Register;
