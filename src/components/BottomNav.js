import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/style";
import { FontAwesome5 } from "@expo/vector-icons";

const BottomNav = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.btncon1}>
        <AntDesign
          name="home"
          size={40}
          color="black"
          style={styles.icon1}
          onPress={() => {
            navigation.navigate("home");
          }}
        />
      </View>

      <View style={styles.btncon2}>
        <Ionicons
          name="search"
          size={30}
          color="black"
          style={styles.icon2}
          onPress={() => {
            navigation.navigate("home");
          }}
        />
      </View>

      <View style={styles.btncon1}>
        <AntDesign
          name="shoppingcart"
          size={30}
          color="black"
          style={styles.icon1}
          onPress={() => {
            navigation.navigate("card");
          }}
        />
      </View>

      <View style={styles.btncon1}>
        <FontAwesome5
          name="map-marked-alt"
          size={30}
          color="black"
          style={styles.icon1}
          onPress={() => {
            navigation.navigate("TrackOdar");
          }}
        />
      </View>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    elevation: 30,
    borderTopColor: colors.text1,
    borderTopWidth: 0.5,
    borderTopRightRadius: 20,
    borderTopStartRadius: 20,
  },
  icon1: {
    color: colors.text1,
  },
  icon2: {
    color: "white",
  },
  btncon2: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    top: 0,
    backgroundColor: colors.text1,
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  btncon1: {
    backgroundColor: colors.col1,
    elevation: 10,
    //the you can chang yor emulator the size all of that has 60,width,height,
    width: 60,
    height: 60,
    // height:60,
    justifyContent: "center",
    alignItems: "center",
  },
});
