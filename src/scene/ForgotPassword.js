import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { btn1, colors, title } from "../styles/style";
import { AntDesign } from "@expo/vector-icons";

import { firebase } from "../services/Firebase/FirebaseConfig.js";

const ForgotPassword = ({ navigation }) => {
  const [emailfocus, setEmailfocus] = useState(false);

  const [email, setEmail] = useState("");

  const [customError, setcustomError] = useState("");

  const handleforgot = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        //Signed in
        alert("An email has been sent to reset your password.");
        navigation.navigate("login");
      })
      .catch((error) => {
        var errorMessage = error.message;
        // console.log(errorMessage);
        if (
          errorMessage ==
          "Firebase : The email address is budly formatted. (auth/invalid-email)."
        ) {
          setcustomError("please enter a valid email address");
        } else {
          setcustomError("Incorrect email");
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head1}>Forgot Password? </Text>
      <Text style={styles.text}>Please confirm your email.</Text>

      {customError !== "" && <Text style={styles.errormsg}>{customError}</Text>}

      <View style={styles.inputout}>
        <AntDesign
          name="user"
          size={24}
          color={emailfocus === true ? colors.text1 : colors.text2}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onFocus={() => {
            setEmailfocus(true);
          }}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
      </View>

      <TouchableOpacity style={btn1} onPress={() => handleforgot()}>
        <Text
          style={{
            color: colors.col1,
            fontSize: title.btntxt,
            fontWeight: "bold",
          }}
        >
          Resest Password
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    // justifyContent:'center',
    marginTop: 60,
  },
  head1: {
    fontSize: title.title1,
    color: colors.text1,
    textAlign: "center",
    marginVertical: 10,
  },
  inputout: {
    flexDirection: "row",
    width: "80%",
    marginVertical: 10,
    backgroundColor: colors.col1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    //  alignSelf:'center',
    elevation: 20,
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: "80%",
  },
  text: {
    fontSize: 16,
    width: "80%",
    color: colors.text1,
    textAlign: "center",
  },
});
