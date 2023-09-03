import { StyleSheet, Text, Button, View, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { btn2, colors, navbtn, navbtnin, navbtnout } from "../styles/style";

const DrawerContent = ({ navigation }) => {
  return (
    <View style={styles.containerout}>
      <View style={styles.halfWhite}>
        <TouchableOpacity
          onPress={() => navigation.navigate("home")}
          style={navbtnout}
        >
          <View style={navbtn}>
            <AntDesign name="back" size={24} color="black" style={navbtnin} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("userprofile")}>
          <View style={styles.section}>
            <AntDesign
              name="user"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.head1}>Your Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("card")}>
          <View style={styles.section}>
            <AntDesign
              name="creditcard"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.head2}>Card Details</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("TrackOdar")}>
          <View style={styles.section}>
            <AntDesign
              name="filetext1"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.head3}>Order Status</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("AboutUs")}>
          <View style={styles.section}>
            <AntDesign
              name="filetext1"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.head4}>About Us</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ContactUs")}>
          <View style={styles.section}>
            <AntDesign
              name="filetext1"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.head5}> Contact Us</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.halfRed}></View>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  containerout: {
    flex: 1,
    flexDirection: "row",
  },
  halfWhite: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  halfRed: {
    flex: 1,
    backgroundColor: "red",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: -10,
  },
  icon: {
    marginRight: 10,
  },
  head1: {
    fontSize: 25,
    fontWeight: "200",
    marginVertical: 65,
    color: colors.text1,
  },
  head2: {
    fontSize: 25,
    fontWeight: "200",
    marginVertical: -40,
    color: colors.text1,
  },
  head3: {
    fontSize: 25,
    fontWeight: "200",
    marginVertical: 70,
    color: colors.text1,
  },
  head4: {
    fontSize: 25,
    fontWeight: "200",
    marginVertical: 5,
    color: colors.text1,
  },
  head5: {
    fontSize: 25,
    fontWeight: "200",
    marginVertical: 60,
    color: colors.text1,
  },
});
