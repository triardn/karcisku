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
    marginLeft: '30%',
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
  nameContainer: {
    marginVertical: 10,
  },
  name: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
  },
  detailProfileContainer: {
    position: 'absolute',
    width: '90%',
    height: '38%',
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
    marginHorizontal: 15,
    marginVertical: 10,
  },
  item: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  itemValue: {
    textAlign: 'right',
  },
  flex: {
    flex: 1,
  },
  buttonLogout: {
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
});
