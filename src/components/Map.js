import React from 'react'
import MapView from 'react-native-maps'
import { StyleSheet, Dimensions } from 'react-native'

const height = Dimensions.get('window').height

const [markers, setmarkers] = useState({
    latitude: '',
    longitude: '',
});

const getPositionsData = async () => {
    fetch('http://192.168.100.222:4200/weebs/api/position/all', {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((json) => {
            settickets(json)
            console.log(json)
        })


        .catch((error) => console.error(error))


};

const Map = () => {
    return (

        <MapView
            style={styles.map}
            loadingEnabled={true}
            region={{
                latitude: 31.6214,
                longitude: -8.0026,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121
            }}
        >
            {markers.map((marker) => (
                <MapView.Marker
                    key={marker._id}
                    identifier={marker._id}
                    coordinate={{
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                    }}
                    title={marker.name}
                />
            ))}


        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        height
    }
})

export default Map