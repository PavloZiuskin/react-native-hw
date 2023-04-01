import React, { useState, useCallback, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  ImageBackground,
  Image,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
} from "react-native";
const initialState = {
  email: "",
  password: "",
};
export const LoginScreen = () => {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isSecurePassword, setIsSecurePassword] = useState(true);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsShowKeyboard(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsShowKeyboard(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  function keyboardHide() {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  }
  function handleSubmitForm() {
    setIsSecurePassword(true);
    setState(initialState);
  }
  const passwordShown = () => {
    isSecurePassword === true
      ? setIsSecurePassword(false)
      : setIsSecurePassword(true);
  };
  const showPasswordBtn = isSecurePassword ? "To show" : "To hide";
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={style.container} onLayout={onLayoutRootView}>
        <ImageBackground
          source={require("../assets/PhotoBG.jpg")}
          style={style.imageBackground}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...style.loginContainer,
                marginBottom:
                  isShowKeyboard && Platform.OS === "ios" ? -160 : 0,
              }}
            >
              <Text style={style.loginTitle}>Sing in</Text>
              <View style={style.formContainer}>
                <TextInput
                  style={style.modal__input}
                  placeholder="Email"
                  value={state.email}
                  onChangeText={(value) => {
                    setState((prevState) => ({ ...prevState, email: value }));
                  }}
                  onFocus={() => {
                    console.log(state);
                    setIsShowKeyboard(true);
                  }}
                />
                <View style={{ position: "relative" }}>
                  <TextInput
                    style={style.modal__input}
                    secureTextEntry={isSecurePassword}
                    placeholder="Password"
                    value={state.password}
                    onChangeText={(value) => {
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }));
                    }}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                    }}
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={style.passwordShowBtn}
                    onPress={passwordShown}
                  >
                    <Text style={style.registerLinkTitle}>
                      {showPasswordBtn}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={style.btn}
                activeOpacity={0.8}
                onPress={handleSubmitForm}
              >
                <Text style={style.btnText}>SING UP</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.btnLink} activeOpacity={0.5}>
                <Text style={style.btnLinkText}>
                  Haven't your account? Sing up
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  loginContainer: {
    position: "relative",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  loginTitle: {
    marginTop: 32,
    marginBottom: 32,
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 30,
  },
  formContainer: {
    justifyContent: "center",
  },
  modal__input: {
    height: 50,
    paddingLeft: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
  },
  btn: {
    marginHorizontal: 16,
    marginTop: 28,
    marginBottom: 16,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  btnText: {
    color: "#FFF",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
  btnLink: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Platform.OS === "ios" ? 45 : 80,
    backgroundColor: "transparent",
  },
  btnLinkText: {
    color: "#1B4371",
    textDecorationLine: "underline",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
  registerLinkTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
    alignItems: "center",
  },
  passwordShowBtn: {
    position: "absolute",
    top: 16,
    right: 16,
  },
});
