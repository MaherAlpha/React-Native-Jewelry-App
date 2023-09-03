import { StyleSheet, Text, View, Image, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { TouchableOpacity } from "react-native";
import { colors, hr80 } from "../styles/style";

import { firebase } from "../services/Firebase/FirebaseConfig.js";

const WelcomeScreen = ({ navigation }) => {
  const [userlogged, setUserlogged] = useState(null);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const checklogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUserlogged(user);
        } else {
          setUserlogged(null);
          console.log("No user logged in");
        }
      });
    };
    checklogin();
  }, []);

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUserlogged(null);
        console.log("User logged out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Welcome to SuitsyouJewelry
      </Animated.Text>
      <View style={styles.logoout}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.hr80} />
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        Find the best Jewelry around you at the lowest price.
      </Animated.Text>
      <View style={styles.hr80} />

      {userlogged == null ? (
        <View style={styles.btnout}>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text style={styles.btn}>Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text style={styles.btn}>Log In</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.logged}>
          <Text style={styles.txtlog}>
            &nbsp; &nbsp; &nbsp; Signed in as{" "}
            <Text style={styles.txtlogin}>{userlogged.email}</Text>
          </Text>

          <View style={styles.btnout}>
            <TouchableOpacity onPress={() => navigation.navigate("home")}>
              <Text style={styles.btn}>Go to Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleLogout()}>
              <Text style={styles.btn}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C72222",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    color: colors.col1,
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "200",
  },
  logoout: {
    width: "70%",
    height: "40%",
    //  backgroundColor:'fff',
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 18,
    width: "80%",
    color: colors.col1,
    textAlign: "center",
  },
  btnout: {
    //convert the row into colum directions of the button
    flexDirection: "row",
  },
  btn: {
    fontSize: 25,
    // color:colors.text1,
    textAlign: "center",
    marginVertical: 30,
    marginHorizontal: 10,
    fontWeight: "700",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
  },
  logged: {
    alignItems: "center",
  },
  txtlog: {
    fontSize: 18,
    color: colors.col1,
  },
  txtlogin: {
    fontSize: 19,
    color: colors.col1,
    fontWeight: "700",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
  hr80: {
    height: 20,
  },
});
