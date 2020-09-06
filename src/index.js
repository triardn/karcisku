import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import Intro from './screens/OnBoarding';
import Login from './screens/Login';
import Home from './screens/Home';
import Profile from './screens/Profile';

const Stack = createStackNavigator();

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
    <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
    <Stack.Screen name="Profile" component={Profile} />
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
