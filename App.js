import React from 'react';
import { NativeBaseProvider, StatusBar, } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HomeScreen, SearchScreen, AboutScreen } from './screens';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// primary color : #44475c

const BottomNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={() => ({
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "black",
        tabBarIconStyle: { marginTop: 10 },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 10
        },
        tabBarStyle: {
          backgroundColor: "#44475c",
          height: 70,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="home-outline" size={size} color={color} />
            );
          },
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="search-outline" size={size} color={color} />
            );
          },
        }}
      />

      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarLabel: "About",
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons
                name="ios-information-circle-outline"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen  name="BottomNavigator" component={BottomNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

