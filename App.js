import React from "react";
import { NativeBaseProvider, StatusBar } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HomeScreen, LibraryScreen, AboutScreen, GameDetailScreen } from "./screens";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home-sharp" : "home-outline";
          } else if (route.name === "Library") {
            iconName = focused ? "ios-library-sharp" : "ios-library-outline";
          } else if (route.name === "About") {
            iconName = focused ? "information-circle-sharp" : "information-circle-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#7f8b9b",
        tabBarIconStyle: { marginTop: 10 },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 10,
        },
        tabBarStyle: {
          backgroundColor: "#272b30",
          height: 70,
          borderTopWidth: 0,
        },
        headerShown: false,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
        }}
      />

      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarLabel: "Library",
        }}
      />

      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarLabel: "About",
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={"#2a2e33"}/>
        <Stack.Navigator screenOptions={{ headerShown: "false" }}>
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="GameDetailScreen" component={GameDetailScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
