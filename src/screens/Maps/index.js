import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoidHJpYXJkbiIsImEiOiJja2V1MGs5ODMybWl0MnpxbTl0ODB6NDNuIn0.EP4N8QPT60XFoHZW20VFzQ',
);

const Maps = () => {
  const variousLocations = [
    [106.637, -6.298972, 'ICE BSD'],
    [106.808503, -6.261956, 'Ke.Ta.Wa Comedy Club'],
    [106.805675, -6.219972, 'Istora Senayan'],
    [106.878289, -6.178951, 'I3L Campus'],
    [106.801797, -6.218346, 'Stadion Gelora Bung Karno'],
    [106.834433, -6.166344, 'Gedung Kesenian Jakarta'],
    [106.825094, -6.234136, 'Balai Kartini'],
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
              coordinate={[point[0], point[1]]}>
              <MapboxGL.Callout title={`${point[2]}`} />
            </MapboxGL.PointAnnotation>
          );
        })}
      </MapboxGL.MapView>
    </View>
  );
};

export default Maps;
