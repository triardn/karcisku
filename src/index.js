import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import Intro from './screens/OnBoarding';
import Login from './screens/Login';

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
