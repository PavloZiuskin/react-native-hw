import React, {  useCallback,  } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  Image,
  View,
  Text,
  ScrollView
} from "react-native";
export const PostScreen=()=>{
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../../assets/fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
    return(
      <ScrollView>
        <View onLayout={onLayoutRootView}>
          <View>
            <View>
              <Image />
            </View>
            <View>
              <Text>PostMenu</Text>
              <Text></Text>
            </View>
          </View>
            
        </View>
      </ScrollView>
       
    )
}