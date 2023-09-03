import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import HomeHeadNav from "../components/HomeHeadNav";
import Cardslider from "../components/Cardslider";
import { firebase } from "../services/Firebase/FirebaseConfig.js";
import BottomNav from "../components/BottomNav";
import { colors, chain } from "../styles/style";

const Chain = ({ navigation }) => {
  const appName = "SuitsyouJewelry";
  const [jewelryData, setJewelryData] = useState([]);
  const [chainData, setChainData] = useState([]);

  const jewelryRef = firebase.firestore().collection("JewelryData");

  useEffect(() => {
    jewelryRef.onSnapshot((snapshot) => {
      setJewelryData(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  useEffect(() => {
    setChainData(jewelryData.filter((item) => item.jewelryType === "chain"));
  }, [jewelryData]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.col1} barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("home")}
          style={styles.backButton}
        >
          <AntDesign
            name="back"
            size={24}
            color="black"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>{appName}</Text>
      </View>

      <ScrollView>
        <View style={styles.cardslider}>
          <Cardslider
            title={"Chain Jewelry"}
            data={chainData}
            navigation={navigation}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Jewelry App - All rights reserved</Text>
      </View>
    </View>
  );
};

export default Chain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.col1,
    width: "100%",
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
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
  },
  backIcon: {
    fontSize: 24,
  },
  cardslider: {
    flexDirection: "column",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
    fontStyle: "italic",
    borderWidth: 1,
    borderColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  descriptionText: {
    fontSize: 20,
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});
