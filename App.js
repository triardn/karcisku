import React, {useEffect} from 'react';
import AppNavigation from './src/routes';
import firebase from '@react-native-firebase/app';

var firebaseConfig = {
  apiKey: 'AIzaSyBlHSn4y0WQ3ETVTXD6Zupyf8atTSL2zHo',
  authDomain: 'sanbercode-2effb.firebaseapp.com',
  databaseURL: 'https://sanbercode-2effb.firebaseio.com',
  projectId: 'sanbercode-2effb',
  storageBucket: 'sanbercode-2effb.appspot.com',
  messagingSenderId: '333799621476',
  appId: '1:333799621476:web:a1c881526db15314fff071',
  measurementId: 'G-YJNE6V5EW1',
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
