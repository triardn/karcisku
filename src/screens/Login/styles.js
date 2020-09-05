import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  inputContainer: {
    marginHorizontal: 30,
  },
  inputItem: {
    marginVertical: 20,
  },
  loginInput: {
    width: 370,
    height: 60,
    borderBottomWidth: 1.0,
    borderBottomColor: '#C6C6C6',
  },
  buttonLogin: {
    backgroundColor: '#3EC6FF',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLoginText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  notHaveAccountContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  textCenter: {
    textAlign: 'center',
  },
  textColorBlue: {
    color: 'blue',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separatorLine: {
    backgroundColor: 'black',
    height: 2,
    width: 170,
  },
  separatorText: {
    textAlign: 'center',
    marginVertical: 15,
  },
  buttonGoogleSignin: {
    width: '102%',
    height: 40,
    marginLeft: -4,
    marginBottom: 10,
  },
  buttonFingerPrintSignin: {
    marginTop: 10,
  },
});
