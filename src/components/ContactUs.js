import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { btn2, colors, navbtn, navbtnin, navbtnout } from "../styles/style";

const ContactUs = ({ navigation }) => {
  const appName = "SuitsyouJewelry";
  const phoneNumber = "03164081162";
  const personName = "Muhammad Zohaib";
  const emailAddress = "contact@SuitsyouJewelry.com";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("home")}
          style={navbtnout}
        >
          <View style={navbtn}>
            <AntDesign name="back" size={24} color="black" style={navbtnin} />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerText}>{appName}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.description}>
          For any inquiries or assistance, please contact {personName} at:
        </Text>
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
        <Text style={styles.emailAddress}>{emailAddress}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>{appName} - All rights reserved</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "red",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    paddingHorizontal: 40,
    lineHeight: 24,
  },
  phoneNumber: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  emailAddress: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  footer: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  footerText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
});

export default ContactUs;
