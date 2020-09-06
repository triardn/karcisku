import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blueBox: {
    width: '100%',
    height: '40%',
    backgroundColor: '#8B0000',
  },
  profileContainer: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '28%',
    marginTop: 70,
  },
  imageContainer: {
    marginVertical: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  detailProfileContainer: {
    position: 'absolute',
    width: '90%',
    height: '49%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginLeft: 20,
    marginTop: 270,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  items: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  item: {
    marginVertical: 5,
  },
  buttonRegister: {
    width: '90%',
    height: 40,
    marginLeft: 20,
    backgroundColor: '#8B0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWhite: {
    color: '#FFFFFF',
  },
  buttonFlipContainer: {
    marginTop: 20,
    marginLeft: 20,
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonFlip: {
    backgroundColor: 'white',
  },
  round: {
    marginTop: 40,
    marginLeft: '27%',
    width: 180,
    height: 250,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: 'white',
  },
  rectangle: {
    marginTop: 100,
    marginLeft: '27%',
    width: 180,
    height: 110,
    borderWidth: 2,
    borderColor: 'white',
  },
  buttonCaptureContainer: {
    marginTop: 120,
    marginLeft: '42%',
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
