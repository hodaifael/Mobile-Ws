import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './src/screens/MapScreen'
import MapListScreen from './src/screens/MapListScreen'
import Home from './src/screens/home'


const Stack = createStackNavigator();


class App extends React.Component {

  render() {
    return (

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen name="MapListScreen" component={MapListScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;