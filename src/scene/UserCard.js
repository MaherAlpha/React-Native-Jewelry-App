import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { firebase } from "../services/Firebase/FirebaseConfig.js";
import { AntDesign } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import {
  btn2,
  colors,
  hr80,
  navbtn,
  navbtnin,
  navbtnout,
} from "../styles/style";

const UserCard = ({ navigation }) => {
  const [carddata, setCarddata] = useState(null);
  const [totalCost, setTotalCost] = useState("0");

  const getCardData = async () => {
    const docRef = firebase
      .firestore()
      .collection("UserCard")
      .doc(firebase.auth().currentUser.uid);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = JSON.stringify(doc.data());
          setCarddata(data);
        } else {
          console.log("No such document");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  useEffect(() => {
    getCardData();
  }, []);

  useEffect(() => {
    if (carddata != null) {
      const jewelryPrice = JSON.parse(carddata).card;
      let totalJewelryPrice = 0;
      jewelryPrice.map((item) => {
        totalJewelryPrice =
          parseInt(item.data.jewelryPrice) * parseInt(item.Jewelryquantity) +
          parseInt(item.data.jewelryAddonPrice) * parseInt(item.Addonquantity) +
          totalJewelryPrice;
      });
      setTotalCost(JSON.stringify(totalJewelryPrice));
    }
  }, [carddata]);

  const deleteItem = (item) => {
    const docRef = firebase
      .firestore()
      .collection("UserCard")
      .doc(firebase.auth().currentUser.uid);
    docRef.update({
      card: firebase.firestore.FieldValue.arrayRemove(item),
    });
    getCardData();
  };

  const updateItem = (updatedItem) => {
    const docRef = firebase
      .firestore()
      .collection("UserCard")
      .doc(firebase.auth().currentUser.uid);
    docRef
      .update({
        card: firebase.firestore.FieldValue.arrayRemove(carddata), // Remove the existing item
      })
      .then(() => {
        docRef
          .update({
            card: firebase.firestore.FieldValue.arrayUnion(updatedItem), // Add the updated item
          })
          .then(() => {
            getCardData(); // Update carddata after updating
          })
          .catch((error) => {
            console.log("Error updating item:", error);
          });
      });
  };

  const editItem = (item) => {
    navigation.navigate("EditProduct", { carddata: item });
  };

  return (
    <View style={styles.containerout}>
      <TouchableOpacity
        onPress={() => navigation.navigate("home")}
        style={navbtnout}
      >
        <View style={navbtn}>
          <AntDesign name="back" size={24} color="black" style={navbtnin} />
        </View>
      </TouchableOpacity>

      <View style={styles.Bottomnav}>
        <BottomNav navigation={navigation} />
      </View>

      <View style={styles.container}>
        <Text style={styles.head1}>Your Card</Text>

        {carddata == null || JSON.parse(carddata).card.length === 0 ? (
          <Text style={styles.head2}>Your Card is Empty</Text>
        ) : (
          <FlatList
            style={styles.cardlist}
            data={JSON.parse(carddata).card}
            renderItem={({ item }) => {
              return (
                <View style={styles.cardcart}>
                  <Image
                    source={{ uri: item.data.jewelryImageUrl }}
                    style={styles.cardimg}
                  />
                  <View style={styles.cardcartin}>
                    <View style={styles.c1}>
                      <Text style={styles.text1}>
                        {item.Jewelryquantity}&nbsp;{item.data.jewelryName}
                      </Text>
                      <Text style={styles.text2}>
                        Rs{item.data.jewelryPrice}/each
                      </Text>
                    </View>
                    {item.Addonquantity > 0 && (
                      <View style={styles.c2}>
                        <Text style={styles.text3}>
                          {item.Addonquantity}&nbsp;&nbsp;
                          {item.data.jewelryAddon}
                        </Text>
                        <Text style={styles.text3}>
                          Rs{item.data.jewelryAddonPrice}/each
                        </Text>
                      </View>
                    )}
                    <TouchableOpacity
                      style={styles.c4}
                      onPress={() => editItem(item)}
                    >
                      <Text style={styles.text1}>Edit</Text>
                      <AntDesign
                        name="edit"
                        size={40}
                        color="black"
                        style={styles.del}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.c4}
                      onPress={() => deleteItem(item)}
                    >
                      <Text style={styles.text1}>Delete</Text>
                      <AntDesign
                        name="delete"
                        size={24}
                        color="black"
                        style={styles.del}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
      <View style={styles.btncont}>
        <View style={styles.c3}>
          <Text style={styles.text5}>Total</Text>
          <Text style={styles.text6}>Rs{totalCost}</Text>
        </View>
        <TouchableOpacity style={btn2}>
          <Text
            style={styles.btntext}
            onPress={() => navigation.navigate("PlaceOdar", { carddata })}
          >
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  Bottomnav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: colors.col1,
    zIndex: 20,
  },

  containerout: {
    flex: 1,
    backgroundColor: colors.col1,
    // alignItems :'center',
    width: "100%",
    // height:'100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.col1,
    alignItems: "center",
    width: "100%",
  },
  head1: {
    fontSize: 40,
    textAlign: "center",
    color: colors.text1,
  },
  head2: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "200",
    marginVertical: 20,
    elevation: 10,
    backgroundColor: colors.col1,
    width: "90%",
    height: "50%",
    alignSelf: "center",
    paddingVertical: "25%",
    borderRadius: 10,
  },
  cardlist: {
    width: "100%",
  },
  cardcart: {
    flexDirection: "row",
    backgroundColor: colors.col1,
    marginVertical: 5,
    borderRadius: 10,
    width: "95%",
    alignSelf: "center",
    elevation: 10,
    alignItems: "center",
  },
  cardimg: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  cardcartin: {
    flexDirection: "column",
    margin: 5,
    width: "58%",
    alignItems: "center",
    justifyContent: "center",
  },
  c1: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: colors.col1,
  },
  c2: {
    backgroundColor: colors.text1,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    flexDirection: "row",
  },
  text1: {
    fontSize: 16,
    color: colors.text1,
    width: "60%",
    fontWeight: "bold",
  },
  text2: {
    fontSize: 16,
    color: colors.text3,
    fontWeight: "bold",
  },
  text3: {
    fontSize: 15,
    color: colors.col1,
  },
  del: {
    color: colors.text1,
  },
  c4: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    borderRadius: 10,
    borderColor: colors.text1,
    // borderWidth:1,
    marginVertical: 10,
    padding: 5,
  },
  btncont: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    flexDirection: "row",
    marginBottom: 90,
    borderTopColor: colors.text3,
    boderTopWidth: 0.2,
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
  c3: {
    flexDirection: "row",
    alignItems: "center",
  },
  text5: {
    fontSize: 20,
    color: colors.text3,
  },
  text6: {
    fontSize: 25,
    color: colors.text3,
    marginHorizontal: 5,
    fontWeight: "bold",
  },
});
