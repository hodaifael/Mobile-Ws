import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

export default function Home({ navigation, route }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [position, setPosition] = useState({
    latitude: '',
    longitude: '',
  });
  const saveData = async () => {
    fetch('http://192.168.100.222:4200/weebs/api/position/save', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ latitude: position.alatitudel, longitude: position.longitude }),
    })
      .then(json)
      .then(function (json) {
        console.log('request succeeded with json response', json.id)

      })
      .catch((error) => console.log("error--" + error));

  };



  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location.coords);
    if (text != 'Waiting..') {
      async () => {
        fetch('http://192.168.100.222:4200/api/position/save', {
          method: 'POST',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ latitude: text.latitude, longitude: text.longitude }),
        })
          .then(json)
          .then(function (json) {
            console.log('request succeeded with json response', json.id)

          })
          .catch((error) => console.log("error--" + error));
      };
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('MapScreen', {})
        }
      >


        <Text style={{
          color: "white",
          color: "white",
          marginHorizontal: 55,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 30,
          backgroundColor: "#00716F",
          paddingVertical: 20,
          borderRadius: 23,
          marginBottom: 31,
          textAlign: 'center',
        }}

        >show Map</Text>

      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});
