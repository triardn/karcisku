import React, {useEffect} from 'react';
import AppNavigation from './src/index';
import firebase from '@react-native-firebase/app';
import OneSignal from 'react-native-onesignal';
import codePush from 'react-native-code-push';

var firebaseConfig = {
  apiKey: 'AIzaSyC98Vjg0ymMNGG3rzIBNToayb22yGo4v9A',
  authDomain: 'karcisku-97f1f.firebaseapp.com',
  databaseURL: 'https://karcisku-97f1f.firebaseio.com',
  projectId: 'karcisku-97f1f',
  storageBucket: 'karcisku-97f1f.appspot.com',
  messagingSenderId: '986703949408',
  appId: '1:986703949408:web:e6cf516b879d1db6e09d05',
  measurementId: 'G-Z0DP3LD6HR',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();
}

const App: () => React$Node = () => {
  useEffect(() => {
    OneSignal.setLogLevel(6, 0);

    OneSignal.init('59a44d5f-01d7-4195-9ab5-2221dd6fa5be', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2);

    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);

    codePush.sync(
      {
        updateDialog: true,
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      syncStatus,
    );

    return () => {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    };
  }, []);

  const syncStatus = (status) => {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for updates');
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Downloading package');
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('Up to date');
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update');
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        Alert.alert('Notification', 'Update installed');
        break;
      case codePush.SyncStatus.AWAITING_USER_ACTION:
        console.log('Awaiting user action');
        break;
      default:
        break;
    }
  };

  const onReceived = (notification) => {
    console.log('Notification received: ', notification);
  };

  const onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  };

  const onIds = (device) => {
    console.log('Device info: ', device);
  };

  return <AppNavigation />;
};

export default App;
