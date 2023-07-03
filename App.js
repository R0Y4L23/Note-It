import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./Home.js"
import Create from "./Create.js"
import Note from "./Note.js"
export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Create" component={Create} options={{headerShown:false}}/>
        <Stack.Screen name="Note" component={Note} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}