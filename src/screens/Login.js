import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login({ navigation, route }) {
    const [user, setUser] = useState({
        imei: '',
    });




    const onChangeImei = (value) => {
        setUser({ ...user, imei: value });
    };



    const setObjectValue = async (v) => {
        try {
            let jsonValue = JSON.stringify(v);
            await AsyncStorage.setItem('userId', jsonValue);
            console.log(jsonValue);
        } catch (e) {
            // save error
        }

    }


    function json(response) {
        return response.json()
    }
    const saveData = async () => {
        fetch('http://192.168.100.222:4200/api/position/save', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ login: user.login, password: user.password }),
        })
            .then(json)
            .then(function (json) {
                console.log('request succeeded with json response', json.id)
                setObjectValue(json.id)
                if (json.id) {
                    navigation.navigate('Gestion', {})
                }
            })
            .catch((error) => console.log("error--" + error));
        console.log(type);

    };



    return (

        <View style={{ width: "100%", height: "100%", marginTop: 20, }}>

            <Text
                style={{
                    marginTop: 50,
                    fontSize: 20,
                    alignSelf: "center",
                }}
            >You have an account then</Text>
            <Text
                style={{
                    marginTop: 50,
                    fontSize: 30,
                    alignSelf: "center",
                }}
            >Sign In</Text>




            <TextInput
                placeholder={'Login'}
                onChangeText={(value) => onChangeLogin(value)}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 55,
                    borderWidth: 2,
                    marginTop: 15,
                    paddingHorizontal: 10,
                    borderColor: "#00716F",
                    borderRadius: 23,
                    paddingVertical: 10,
                    paddingHorizontal: 10
                }}
            />





            <TextInput
                placeholder={'Password'}
                onChangeText={(value) => onChangePassword(value)}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 55,
                    borderWidth: 2,
                    marginTop: 15,
                    paddingHorizontal: 10,
                    borderColor: "#00716F",
                    borderRadius: 23,
                    paddingVertical: 10,
                    paddingHorizontal: 10
                }}
            />



            <TouchableOpacity
                onPress={saveData}
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

                >Sign In</Text>

            </TouchableOpacity>

            <Text
                onPress={() =>
                    navigation.replace('Register', {})
                }
                style={{
                    alignSelf: "center",
                    color: "#00716F",
                    paddingVertical: 30
                }}>Sign Up</Text>
        </View>
    )

}