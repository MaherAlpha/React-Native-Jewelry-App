import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { firebase } from "../services/Firebase/FirebaseConfig.js";
import { AntDesign } from "@expo/vector-icons";
import {
  colors,
  navbtn,
  navbtnin,
  navbtnout,
  btn2,
  hr80,
  incdecbtn,
  incdecinput,
  incdecout,
} from "../styles/style";
import {
  necklace,
  earring,
  watches,
  bracelet,
  ring,
  chain,
} from "../styles/style";

const EditProduct = ({ navigation, route }) => {
  const carddata = route.params.carddata;
  const [quantity, setQuantity] = useState("1");
  const [addonquantity, setAddonQuantity] = useState("0");

  const updateCardData = () => {
    const docRef = firebase
      .firestore()
      .collection("UserCard")
      .doc(firebase.auth().currentUser.uid);

    const updatedCardData = {
      ...carddata,
      Addonquantity: addonquantity,
      Jewelryquantity: quantity,
    };

    docRef
      .update({
        card: firebase.firestore.FieldValue.arrayRemove(carddata),
      })
      .then(() => {
        docRef.update({
          card: firebase.firestore.FieldValue.arrayUnion(updatedCardData),
        });
        alert("Card data updated successfully");
      })
      .catch((error) => {
        console.log("Error updating card data:", error);
      });
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => (parseInt(prevQuantity) + 1).toString());
  };

  const decreaseQuantity = () => {
    if (parseInt(quantity) > 1) {
      setQuantity((prevQuantity) => (parseInt(prevQuantity) - 1).toString());
    }
  };

  const increaseAddonQuantity = () => {
    setAddonQuantity((prevAddonQuantity) =>
      (parseInt(prevAddonQuantity) + 1).toString()
    );
  };

  const decreaseAddonQuantity = () => {
    if (parseInt(addonquantity) > 0) {
      setAddonQuantity((prevAddonQuantity) =>
        (parseInt(prevAddonQuantity) - 1).toString()
      );
    }
  };

  const totalPrice =
    carddata.jewelryPrice != ""
      ? (
          parseInt(carddata.jewelryPrice) * parseInt(quantity) +
          parseInt(addonquantity) * parseInt(carddata.jewelryAddonPrice)
        ).toString()
      : "0";

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={navbtnout}>
        <View style={navbtn}>
          <AntDesign name="back" size={24} color="black" style={navbtnin} />
        </View>
      </TouchableOpacity>

      <View style={styles.container1}>
        <View style={styles.s1}>
          <Image
            source={{ uri: carddata.data.jewelryImageUrl }}
            style={styles.cardimgin}
          />
        </View>

        <View style={styles.s2}>
          <View style={styles.s2in}>
            <Text style={styles.text1}>{carddata.data.jewelryName}</Text>
            <Text style={styles.text2}>Rs.{carddata.data.jewelryPrice}/-</Text>
          </View>

          <View style={styles.s3}>
            <Text style={styles.text3}>About Jewelry</Text>
            <Text style={styles.text4}>{carddata.data.jewelryDescription}</Text>

            <View style={styles.s3in}>
              {carddata.data.jewelryType === "earring" ? (
                <Text style={earring}>Earring</Text>
              ) : carddata.data.jewelryType === "watches" ? (
                <Text style={watches}>Watches</Text>
              ) : carddata.data.jewelryType === "ring" ? (
                <Text style={ring}>Ring</Text>
              ) : carddata.data.jewelryType === "necklace" ? (
                <Text style={necklace}>Necklace</Text>
              ) : carddata.data.jewelryType === "chain" ? (
                <Text style={chain}>Chain</Text>
              ) : (
                <Text style={bracelet}>Bracelet</Text>
              )}
              <Text style={styles.text5}>{carddata.data.jewelryType}</Text>
            </View>
          </View>

          {carddata.data.jewelryAddonPrice && (
            <View style={styles.container3}>
              <View style={hr80} />
              <Text style={styles.txt3}>Add Extra Box</Text>
              <View style={styles.c3in}>
                <Text style={styles.text4}>{carddata.data.jewelryAddon}</Text>
                <Text style={styles.text4}>
                  Rs{carddata.data.jewelryAddonPrice}/-
                </Text>
              </View>
              <View style={incdecout}>
                <Text style={incdecbtn} onPress={increaseAddonQuantity}>
                  +
                </Text>
                <TextInput
                  value={addonquantity}
                  style={incdecinput}
                  onChangeText={setAddonQuantity}
                />
                <Text style={incdecbtn} onPress={decreaseAddonQuantity}>
                  -
                </Text>
              </View>
            </View>
          )}

          <View style={styles.container3}>
            <View style={hr80} />
            <Text style={styles.txt3}>Jewelry Quantity</Text>
            <View style={incdecout}>
              <Text style={incdecbtn} onPress={increaseQuantity}>
                +
              </Text>
              <TextInput
                value={quantity}
                style={incdecinput}
                onChangeText={setQuantity}
              />
              <Text style={incdecbtn} onPress={decreaseQuantity}>
                -
              </Text>
            </View>
            <View style={hr80} />
          </View>
        </View>

        <View style={styles.container4}>
          <View style={styles.c4in}>
            <Text style={styles.text2}>Total Price</Text>
            <Text style={styles.txt5}>
              Rs{parseInt(carddata.data.jewelryPrice) * parseInt(quantity)}/-
            </Text>
          </View>
          <View style={hr80} />
        </View>

        <View style={styles.btncont}>
          <TouchableOpacity style={btn2} onPress={updateCardData}>
            <Text style={styles.btntext}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProduct;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  container1: {
    flex: 1,
    backgroundColor: "#fff",
  },
  s1: {
    width: "100%",
    height: 300,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardimgin: {
    width: "100%",
    height: "100%",
  },
  s2: {
    width: "100%",
    padding: 20,
  },
  s2in: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  text1: {
    fontSize: 40,
    fontWeight: "500",
    color: colors.text1,
    width: 220,
    marginRight: 10,
  },
  text2: {
    fontSize: 40,
    fontWeight: "200",
    color: colors.text3,
  },
  s3: {
    backgroundColor: colors.text1,
    padding: 20,
    borderRadius: 20,
  },
  text3: {
    fontSize: 30,
    fontWeight: "200",
    color: colors.col1,
  },
  text4: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "400",
    color: colors.col1,
  },
  text5: {
    color: colors.text3,
    fontSize: 20,
    fontWeight: "200",
    marginLeft: 10,
  },
  s3in: {
    backgroundColor: colors.col1,
    padding: 10,
    borderRadius: 10,
    width: 130,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btncont: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  btntext: {
    backgroundColor: colors.text1,
    color: colors.col1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
    borderRadius: 10,
    width: "90%",
    textAlign: "center",
  },
  txt3: {
    color: colors.text1,
    fontSize: 20,
    textAlign: "center",
  },
  container3: {
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
  },
  c3in: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  text4: {
    color: colors.text3,
    fontSize: 20,
    marginHorizontal: 10,
  },
  container4: {
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
  },
  c4in: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    alignItems: "center",
  },
  txt5: {
    color: colors.text1,
    fontSize: 35,
    textAlign: "center",
  },
});
