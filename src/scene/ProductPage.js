import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
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
  Bracelet,
  ring,
  chain /*,goldColor ,silverColor*/,
} from "../styles/style";
import { TextInput } from "react-native";

const ProductPage = ({ navigation, route }) => {
  const appName = "SuitsyouJewelry";
  const data = route.params;
  // console.log('Product page data',data)
  if (route.params === undefined) {
    navigation.navigate("home");
  }
  const [quantity, setQuantity] = useState("1");
  const [addonquantity, setAddonQuantity] = useState("0");

  const addtocard = () => {
    //  console.log('add to the card)
    const docRef = firebase
      .firestore()
      .collection("UserCard")
      .doc(firebase.auth().currentUser.uid);

    const data1 = {
      data,
      Addonquantity: addonquantity,
      Jewelryquantity: quantity,
    };
    // console.log('data1' ,data1);

    docRef.get().then((doc) => {
      if (doc.exists) {
        docRef.update({
          card: firebase.firestore.FieldValue.arrayUnion(data1),
        });
        alert("added to card");
      } else {
        docRef.set({
          card: [data1],
        });
        alert("Added to the cart");
      }
    });
  };

  const increaseQuantity = () => {
    setQuantity((parseInt(quantity) + 1).toString());
  };
  const decreaseQuantity = () => {
    if (parseInt(quantity) > 1) {
      setQuantity((parseInt(quantity) - 1).toString());
    }
  };

  const increaseAddonQuantity = () => {
    setAddonQuantity((parseInt(addonquantity) + 1).toString());
  };
  const decreaseAddonQuantity = () => {
    if (parseInt(addonquantity) > 0) {
      setAddonQuantity((parseInt(addonquantity) - 1).toString());
    }
  };

  //  console.log(data.jewelryAddonPrice);

  const carddata = JSON.stringify({
    card: [{ Addonquantity: addonquantity, Jewelryquantity: quantity, data }],
  });

  return (
    <ScrollView style={styles.container}>
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
      <View style={styles.container1}>
        <View style={styles.s1}>
          <Image
            source={{
              uri: data.jewelryImageUrl,
            }}
            style={styles.cardimgin}
          />
        </View>

        <View style={styles.s2}>
          <View style={styles.s2in}>
            <Text style={styles.text1}>{data.jewelryName}</Text>
            <Text style={styles.text2}>Rs.{data.jewelryPrice}/-</Text>
          </View>

          <View style={styles.s3}>
            <Text style={styles.text3}>About Jewerly</Text>
            <Text style={styles.text4}>{data.jewelryDescription}</Text>

            <View style={styles.s3in}>
              {/* {data.jewelryType == 'earring ' ? <Text style = { earring}>
                 </Text> : <Text style={necklace}></Text>} */}

              {data.jewelryType === "earring" ? (
                <Text style={earring}></Text>
              ) : data.jewelryType === "watches" ? (
                <Text style={watches}></Text>
              ) : data.jewelryType === "ring" ? (
                <Text style={ring}></Text>
              ) : data.jewelryType === "bracelet" ? (
                <Text style={Bracelet}></Text>
              ) : (
                <Text style={necklace}></Text>
              )}

              <Text style={styles.text5}>{data.jewelryType}</Text>
            </View>
          </View>

          {data.jewelryAddonPrice != "" && (
            <View style={styles.container3}>
              <View style={hr80}></View>
              <Text style={styles.txt3}>Add Extra Box</Text>
              <View style={styles.c3in}>
                <Text style={styles.text4}>{data.jewelryAddon}</Text>
                <Text style={styles.text4}>Rs{data.jewelryAddonPrice}/-</Text>
              </View>
              <View style={incdecout}>
                <Text style={incdecbtn} onPress={() => increaseAddonQuantity()}>
                  +
                </Text>
                <TextInput value={addonquantity} style={incdecinput} />
                <Text style={incdecbtn} onPress={() => decreaseAddonQuantity()}>
                  -
                </Text>
              </View>
            </View>
          )}

          <View style={styles.container3}>
            <View style={hr80}></View>
            <Text style={styles.txt3}>Jewelry Quantity</Text>
            <View style={incdecout}>
              <Text style={incdecbtn} onPress={() => increaseQuantity()}>
                +
              </Text>
              <TextInput value={quantity} style={incdecinput} />
              <Text style={incdecbtn} onPress={() => decreaseQuantity()}>
                -
              </Text>
            </View>
            <View style={hr80}></View>
          </View>
        </View>

        <View style={styles.container4}>
          <View style={styles.c4in}>
            <Text style={styles.text2}>Total Price</Text>
            {data.jewelryPrice != "" ? (
              <Text style={styles.txt5}>
                Rs
                {(
                  parseInt(data.jewelryPrice) * parseInt(quantity) +
                  parseInt(addonquantity) * parseInt(data.jewelryAddonPrice)
                ).toString()}
              </Text>
            ) : (
              <Text style={styles.txt5}>
                Rs
                {(parseInt(data.jewelryPrice) * parseInt(quantity)).toString()}
                /-
              </Text>
            )}
          </View>
          <View style={hr80}></View>
        </View>

        <View style={styles.btncont}>
          <TouchableOpacity style={btn2} onPress={() => addtocard()}>
            <Text style={styles.btntext}>Add to Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={btn2}>
            <Text
              style={styles.btntext}
              onPress={() => navigation.navigate("PlaceOdar", { carddata })}
            >
              Buy Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems:'center',
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
  container1: {
    // position :'absolute',
    // top:0,
    flex: 1,
    backgroundColor: "#fff",
    // alignItems:'center',
    // justifyContent:'center',
  },
  s1: {
    width: "100%",
    height: 300,
    backgroundColor: "fff",
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
    // width: '30%',
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
    // width :30% ,
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
