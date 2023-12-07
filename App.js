import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import Database from "./Database";
import DetailScreen from "./screens/DetailScreen";
import AddScreen from "./screens/AddScreen";
import HomeScreen from "./screens/HomeScreen.js";
const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    Database.initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ title: 'Home', headerTitleAlign: 'center', headerTitleStyle: {fontSize: 40} }}  component={HomeScreen} />
        <Stack.Screen name="Add" options={{ title: 'Add New Hike', headerTitleAlign: 'center', headerTitleStyle: {fontSize: 40} }} component={AddScreen} />
        <Stack.Screen name="Detail" options={{ title: 'Detail', headerTitleAlign: 'center', headerTitleStyle: {fontSize: 40} }} component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;