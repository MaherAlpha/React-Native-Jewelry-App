import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { btn2, colors, navbtn, navbtnin, navbtnout } from "../styles/style";

const AboutUs = ({ navigation }) => {
  const [selectedJewelry, setSelectedJewelry] = useState("");

  const jewelryDescriptions = [
    {
      name: "Necklaces",
      description:
        "Add a touch of elegance to your outfits with our stunning necklaces. Crafted with precision and attention to detail, our necklaces are perfect for any occasion.",
    },
    {
      name: "Earrings",
      description:
        "Enhance your beauty with our sparkling earrings. From delicate studs to glamorous chandeliers, our collection offers a wide range of styles to suit your taste.",
    },
    {
      name: "Bracelets",
      description:
        "Adorn your wrists with our exquisite bracelets. Made with the finest materials, our bracelets combine style and sophistication, making them the perfect accessory.",
    },
    {
      name: " Rings",
      description:
        "Make a statement with our glamorous rings. Whether you prefer classic designs or modern twists, our rings will add a touch of glamour to your fingers.",
    },
    {
      name: "Stylish Watches",
      description:
        "Stay on time and in style with our collection of stylish watches. From sleek minimalist designs to bold and luxurious timepieces, we have the perfect watch for you.",
    },
  ];

  const handleJewelryPress = (name) => {
    setSelectedJewelry(name);
  };

  return (
    <View style={styles.container}>
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
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>About Us</Text>
          <Text style={styles.description}>
            We take pride in offering a wide range of high-quality jewelry. Our
            collection includes:
          </Text>
          {jewelryDescriptions.map((jewelry, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.jewelryButton,
                selectedJewelry === jewelry.name && styles.highlightedButton,
              ]}
              onPress={() => handleJewelryPress(jewelry.name)}
            >
              <Text style={styles.jewelryName}>{jewelry.name}</Text>
              {selectedJewelry === jewelry.name && (
                <Text style={styles.jewelryDescription}>
                  {jewelry.description}
                </Text>
              )}
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.redButton}>
            <Text style={styles.buttonText}>Thanks For Visit Our App</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Jewelry App - All rights reserved</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "red",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    alignSelf: "flex-start",
  },
  backIcon: {
    marginTop: 5,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "black",
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "black",
  },
  jewelryButton: {
    width: "100%",
    backgroundColor: "lightgray",
    borderRadius: 5,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  highlightedButton: {
    backgroundColor: "lightblue",
  },
  jewelryName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  jewelryDescription: {
    fontSize: 14,
    color: "black",
    marginTop: 10,
    textAlign: "center",
  },
  redButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
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

export default AboutUs;
