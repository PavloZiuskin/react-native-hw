import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from "react-native";
import { RegistrationScreen, LoginScreen } from "./src/Screens/auth";
import { CommentsScreen, Home, MapScreen } from "./src/Screens/main";
import { pallete } from "./src/helpers/variables";

const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
// const Tab = createMaterialBottomTabNavigator();
export const useRoutes = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          name="Register"
          component={RegistrationScreen}
          options={{ headerShown: false }}
          // initialParams={{ orientation }}
        />
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  } else {
    return (
      <HomeStack.Navigator initialRouteName="Home">
        <HomeStack.Screen
          name="Home"
          component={Home}
          options={{
            // headerRight: () => LogOut(),
            headerShown: false,
          }}
        />

        <HomeStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={{ headerTitleAlign: "center" }}
        />
        <HomeStack.Screen
          name="Map"
          component={MapScreen}
          options={{ headerTitleAlign: "center" }}
        />
      </HomeStack.Navigator>
    );
  }
};

function LogOut() {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        marginRight: 16,
      }}
      onPress={() => alert("Log out from your acount NEW")}
    >
      <FontAwesome name="sign-out" size={24} color={pallete.gray} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: pallete.white,
    // paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: pallete.gray,
  },
});