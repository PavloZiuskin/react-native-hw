import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  Alert,
  TouchableOpacity,
  Text,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { pallete } from "../../helpers/variables";
import { useNavigation } from "@react-navigation/native";

const image = require("../../images/bg-img.png");

// ! Main CODE

export function RegistrationScreen({
  route,
  // navigation,
  // orientation = "portrait",
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAvatar, setShowAvatar] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [inputLoginStyle, setInputLoginStyle] = useState(styles.input);
  const [inputEmailStyle, setInputEmailStyle] = useState(styles.input);
  const [inputPasswordStyle, setInputPasswordStyle] = useState(styles.input);
  const [securePassword, setSecurePassword] = useState(true);

  const navigation = useNavigation();

  const orientation = "portrait"; // TODO

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const nameHandler = (text) => setName(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const resetRegisterForm = () => {
    setEmail("");
    setName("");
    setPassword("");
  };

  const onRegister = () => {
    const userCredentials = { name, email, password };
    Alert.alert("Credentials", `${name} + ${email} + ${password}`);
    // navigation.navigate("Comment");
    resetRegisterForm();
    navigation.navigate("Home");
  };

  const toggleShowAvatar = () => {
    setShowAvatar((prevState) => !prevState);
  };

  const toggleShowPassword = () => {
    setSecurePassword((prevState) => !prevState);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* <View style={styles.container}> */}
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View
            style={{
              ...styles.form,
              paddingBottom: isKeyboardOpen
                ? 12
                : orientation === "portrait"
                ? 45
                : 10,
            }}
          >
            <View style={styles.imgWrapper}>
              {!showAvatar ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    ...styles.btnAddAvatar,
                    borderColor: pallete.accent,
                  }}
                  onPress={toggleShowAvatar}
                >
                  <AntDesign name="plus" size={15} color={pallete.accent} />
                </TouchableOpacity>
              ) : (
                <>
                  <Image
                    style={styles.avatar}
                    source={require("../../images/avatar.jpg")}
                    alt="user avatar"
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      ...styles.btnAddAvatar,
                      borderColor: pallete.gray,
                    }}
                    onPress={toggleShowAvatar}
                  >
                    <FontAwesome name="times" size={15} color={pallete.gray} />
                  </TouchableOpacity>
                </>
              )}
            </View>

            <Text
              style={{
                ...styles.title,
                marginBottom: orientation === "portrait" ? 33 : 10,
              }}
            >
              Registration
            </Text>

            <TextInput
              style={inputLoginStyle}
              value={name}
              placeholder="Login"
              onChangeText={nameHandler}
              onFocus={() =>
                setInputLoginStyle({
                  ...styles.input,
                  ...styles.inputFocused,
                })
              }
              onBlur={() => setInputLoginStyle(styles.input)}
            />

            <TextInput
              style={inputEmailStyle}
              value={email}
              onChangeText={emailHandler}
              placeholder="Email"
              onFocus={() =>
                setInputEmailStyle({
                  ...styles.input,
                  ...styles.inputFocused,
                })
              }
              onBlur={() => setInputEmailStyle(styles.input)}
            />

            <View style={styles.passwordWrapper}>
              <TextInput
                style={inputPasswordStyle}
                value={password}
                onChangeText={passwordHandler}
                onFocus={() =>
                  setInputPasswordStyle({
                    ...styles.input,
                    ...styles.inputFocused,
                  })
                }
                onBlur={() => setInputPasswordStyle(styles.input)}
                placeholder="Password"
                secureTextEntry={securePassword}
              />
              {securePassword ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btnShowPassword}
                  onPress={toggleShowPassword}
                >
                  <AntDesign name="eye" size={20} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.btnShowPassword}
                  onPress={toggleShowPassword}
                >
                  <FontAwesome name="eye-slash" size={20} />
                </TouchableOpacity>
              )}
            </View>

            <View style={{ display: isKeyboardOpen ? "none" : "flex" }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  ...styles.btnRegister,
                  marginTop: orientation === "portrait" ? 43 : 10,
                }}
                onPress={onRegister}
              >
                <Text style={styles.btnTitle}>Register</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.linkNavigate}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.linkTitle}>If you have accout? Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
      {/* </View> */}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  image: {
    flex: 1,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    overflow: "hidden",
  },
  form: {
    position: "relative",
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: pallete.white,
    // justifyContent: "flex-end",
    // backgroundColor: "#b25757",
  },
  title: {
    // marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: pallete.black,
  },
  input: {
    height: 50,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: pallete.gray,
    marginBottom: 10,
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  inputFocused: {
    borderColor: pallete.accent,
  },
  btnRegister: {
    // marginTop: 43,
    padding: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: pallete.accent,
    borderRadius: 100,
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    color: pallete.white,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
  imgWrapper: {
    position: "absolute",
    top: 0,
    left: "50%",
    width: 120,
    height: 120,
    backgroundColor: "#fafafa",
    transform: [{ translateX: -30 }, { translateY: -60 }],
    borderRadius: 16,
  },
  btnAddAvatar: {
    position: "absolute",
    top: "70%",
    right: -12,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",

    width: 25,
    height: 25,
    borderRadius: 12,
    borderWidth: 1,

    backgroundColor: pallete.white,
  },
  bgImg: {
    width: "100%",
    resizeMode: "cover",
  },
  linkNavigate: {
    padding: 10,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  linkTitle: {
    fontFamily: "Roboto-Regular",
    color: pallete.link,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
  passwordWrapper: { position: "relative" },
  btnShowPassword: {
    position: "absolute",
    top: 14,
    right: 15,
  },
});
