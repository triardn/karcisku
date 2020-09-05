import React, {useEffect} from 'react';
import AppNavigation from './src/routes';
import firebase from '@react-native-firebase/app';

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
  return <AppNavigation />;
};

export default App;
