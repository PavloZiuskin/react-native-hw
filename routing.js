import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";



import {LoginScreen} from "./Screens/LoginScreen";
import {RegistrationForm} from "./Screens/RegistrationScreen";
import {PostScreen} from "./Screens/mainScreens/PostScreen/PostScreen";
import {CreatePostScreen }from "./Screens/mainScreens/PostScreen/CreatePostScreen";
import {ProfileScreen} from "./Screens/mainScreens/Profile/ProfileScreen";

// icons import

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationForm}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name="postage-stamp"
              size={size}
              color={color}
            />
          ),
          tabBarShowLabel: false,
          tabBarStyle: [
              {
                "display": "flex"
              },
              null
              ]
        }}
        name="Posts"
        component={PostScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="pluscircleo" size={35} color={color} />
          ),
          tabBarShowLabel: false,
          tabBarStyle: [
              {
                "display": "flex"
              },
              null
              ]
        }}
        name="Create"
        component={CreatePostScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name="face-profile"
              size={size}
              color={color}
            />
          ),
          tabBarShowLabel: false,
          tabBarStyle: [
              {
                "display": "flex"
              },
              null
              ]
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};