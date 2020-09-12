import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoidHJpYXJkbiIsImEiOiJja2V1MGs5ODMybWl0MnpxbTl0ODB6NDNuIn0.EP4N8QPT60XFoHZW20VFzQ',
);

const Maps = () => {
  const variousLocations = [
    [107.598827, -6.896191],
    [107.596198, -6.899688],
    [107.618767, -6.902226],
    [107.621095, -6.89869],
    [107.615698, -6.896741],
    [107.613544, -6.897713],
    [107.613697, -6.893795],
    [107.610714, -6.891356],
    [107.605468, -6.893124],
    [107.60918, -6.898013],
    [106.781757, -6.555795],
  ];

  useEffect(() => {
    const getLocation = async () => {
      try {
        const permission = await MapboxGL.requestAndroidLocationPermissions();
      } catch (err) {
        console.log(err);
      }
    };

    getLocation();
  }, []);

  return (
    <View style={{flex: 1}}>
      <MapboxGL.MapView style={{flex: 1}}>
        <MapboxGL.UserLocation visible={true} />
        <MapboxGL.Camera followUserLocation={true} />
        {variousLocations.map((point, index) => {
          return (
            <MapboxGL.PointAnnotation
              key={index}
              id={`PointAnnotation${index}`}
              coordinate={point}>
              <MapboxGL.Callout
                title={`Longitude : ${point[0]} \n Latitude : ${point[1]}`}
              />
            </MapboxGL.PointAnnotation>
          );
        })}
      </MapboxGL.MapView>
    </View>
  );
};

export default Maps;
