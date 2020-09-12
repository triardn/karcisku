import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from './screens/SplashScreen';
import Intro from './screens/OnBoarding';
import Login from './screens/Login';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Register from './screens/Register';
import Maps from './screens/Maps';
import Chat from './screens/Chat';
import Statistics from './screens/Statistics';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if (route.name === 'Profile') {
          iconName = 'account-circle-outline';
        } else if (route.name === 'Home') {
          iconName = 'home-outline';
        } else if (route.name === 'Maps') {
          iconName = 'map-marker-circle';
        } else if (route.name === 'Chat') {
          iconName = 'chat';
        }

        return (
          <MaterialCommunityIcon name={iconName} size={size} color={color} />
        );
      },
    })}
    tabBarOptions={{
      activeTintColor: '#8B0000',
      inactiveTintColor: 'gray',
    }}>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Maps" component={Maps} />
    <Tab.Screen name="Chat" component={Chat} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

const MainNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Intro"
      component={Intro}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Login"
      component={Login}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Home"
      component={BottomTabNavigator}
      options={{headerShown: false}}
    />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen
      name="Stats"
      component={Statistics}
      options={{headerShown: true, title: 'Statistik Acara'}}
    />
  </Stack.Navigator>
);

function AppNavigation() {
  const [isLoading, setIsLoading] = React.useState(true);

  //mengatur durasi splashscreen saat aplikasi pertama kali dibuka
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading);
    }, 3000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
}

export default AppNavigation;
