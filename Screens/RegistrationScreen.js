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
  login: "",
  email: "",
  password: "",
};

export const RegistrationForm = () => {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isSecurePassword, setIsSecurePassword] = useState(true);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsShowKeyboard(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsShowKeyboard(false); // or some other action
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
  const showPasswordBtn = isSecurePassword ? "To show" : "To hide";
  const passwordShown = () => {
    isSecurePassword === true
      ? setIsSecurePassword(false)
      : setIsSecurePassword(true);
  };
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
                ...style.registrationContainer,
                marginBottom:
                  isShowKeyboard && Platform.OS === "ios" ? -160 : 0,
              }}
            >
              <View style={style.avatar}>
                <Image />
                <TouchableOpacity style={style.btnAdd} activeOpacity={0.8}>
                  <Image source={require("../assets/Union.png")} />
                </TouchableOpacity>
              </View>

              <Text style={style.registrationTitle}>Registration</Text>
              <View style={style.formContainer}>
                <TextInput
                  style={style.modal__input}
                  placeholder="Login"
                  value={state.login}
                  onChangeText={(value) => {
                    setState((prevState) => ({ ...prevState, login: value }));
                  }}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                />
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
                <Text style={style.btnLinkText}>Have you account? Sing in</Text>
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
  registrationContainer: {
    position: "relative",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatar: {
    position: "absolute",
    left: "35%",
    top: -50,
    width: 120,
    height: 120,
    borderRadius: 15,
    backgroundColor: "#F6F6F6",
  },
  btnAdd: {
    position: "absolute",
    bottom: 13,
    right: -13,
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    borderWidth: 0.5,
    borderRadius: "50%",
    borderColor: "#FF6C00",
  },
  registrationTitle: {
    marginTop: 92,
    marginBottom: 32,
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 30,
  },
  formContainer: {
    position: "relative",
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
    fontSize: 16,
    fontFamily: "Roboto-Medium",
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
    fontSize: 16,
    fontFamily: "Roboto-Medium",
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
