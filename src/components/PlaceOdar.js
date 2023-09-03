import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { FlatList } from "react-native";
import { firebase } from "../services/Firebase/FirebaseConfig.js";
import {
  colors,
  navbtn,
  navbtnin,
  navbtnout,
  btn1,
  hr80,
  incdecbtn,
  incdecinput,
  incdecout,
} from "../styles/style";

const PlaceOdar = ({ navigation, route }) => {
  const appName = "SuitsyouJewelry";
  const { carddata } = route.params;
  const [ordardata, setOrdardata] = useState([]);
  const [totalCost, setTotalCost] = useState("0");
  // console.log(carddata)
  useEffect(() => {
    setOrdardata(JSON.parse(carddata));
  }, [carddata]);

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

  //user profile related data

  const [userloggeduid, setUserloggeduid] = useState(null);
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    const checklogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUserloggeduid(user.uid);
        } else {
          setUserloggeduid("no user");
        }
      });
    };
    checklogin();
  }, []);

  useEffect(() => {
    const getuserdata = async () => {
      const docRef = firebase
        .firestore()
        .collection("UserData")
        .where("uid", "==", userloggeduid);
      const doc = await docRef.get();
      if (!doc.empty) {
        doc.forEach((doc) => {
          setUserdata(doc.data());
        });
      } else {
        // console.log('No such document!');
      }
    };
    getuserdata();
  }, [userloggeduid]);

  // console.log(userdata);

  const placehow = () => {
    const docRef = firebase
      .firestore()
      .collection("UserOrders")
      .doc(new Date().getTime().toString());

    docRef
      .set({
        ordarid: docRef.id,
        ordardata: ordardata,
        ordarstatus: "pending",
        ordarcost: totalCost,
        ordardate: firebase.firestore.FieldValue.serverTimestamp(),
        ordarphone: userdata.phone,
        ordarname: userdata.name,
        ordaruseruid: userloggeduid,
        ordarpayment: "online",
        paymentstatus: "paid",
      })
      .then(() => {
        alert("order placed");
      });
  };

  return (
    <ScrollView style={styles.containerout}>
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
      <View style={styles.container}>
        <Text style={styles.head1}>Your order details Summary</Text>
        <FlatList
          style={styles.c1}
          data={ordardata.card}
          renderItem={({ item }) => {
            return (
              <View style={styles.rowut}>
                <View style={styles.row}>
                  <View style={styles.left}>
                    <Text style={styles.qut}>{item.Jewelryquantity}</Text>
                    <Text style={styles.title}>{item.data.jewelryName}</Text>
                    <Text style={styles.price1}>
                      Rs{item.data.jewelryPrice}
                    </Text>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.totalprice}>
                      Rs
                      {parseInt(item.Jewelryquantity) *
                        parseInt(item.data.jewelryPrice)}
                    </Text>
                  </View>
                </View>
                {item.Addonquantity > 0 && (
                  <View style={styles.row}>
                    <View style={styles.left}>
                      <Text style={styles.qut}>{item.Addonquantity}</Text>
                      <Text style={styles.title}>{item.data.jewelryAddon}</Text>
                      <Text style={styles.price1}>
                        Rs{item.data.jewelryAddonPrice}
                      </Text>
                    </View>
                    <View style={styles.right}>
                      <Text style={styles.totalprice}>
                        Rs
                        {parseInt(item.Addonquantity) *
                          parseInt(item.data.jewelryAddonPrice)}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            );
          }}
        />

        <View style={hr80}></View>

        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.title}>Order Total :</Text>
          </View>
          <View style={styles.left}>
            <View style={styles.left}>
              <Text style={styles.totalprice}>{totalCost}</Text>
            </View>
          </View>
        </View>
        <View style={hr80}></View>

        <View style={styles.userdatout}>
          <Text style={styles.head1}>Your Details</Text>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Name :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{userdata?.name}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Email :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{userdata?.email}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Phone :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{userdata?.phone}</Text>
            </View>
          </View>
        </View>

        <View style={hr80}></View>

        <View>
          <TouchableOpacity style={btn1}>
            <Text style={styles.btntext} onPress={() => placehow()}>
              Proceed to Payment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>{appName} - All rights reserved</Text>
      </View>
    </ScrollView>
  );
};

export default PlaceOdar;

const styles = StyleSheet.create({
  containerout: {
    flex: 1,
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
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
  head1: {
    fontSize: 30,
    fontWeight: "200",
    color: colors.text1,
    margin: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    justifyContent: "space-between",
  },
  rowut: {
    flexDirection: "column",
    margin: 10,
    elevation: 10,
    backgroundColor: colors.col1,
    padding: 20,
    borderRadius: 10,
  },
  qut: {
    width: 40,
    height: 30,
    backgroundColor: colors.text1,
    borderRadius: 10,
    textAlign: "center",
    textAlignVertical: "center",
    marginRight: 10,
    color: colors.col1,
    fontSize: 17,
    fontWeight: "bold",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 10,
  },
  price1: {
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 10,
    color: colors.text1,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalprice: {
    fontSize: 17,
    fontWeight: "bold",
    borderColor: colors.text1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  btntext: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.col1,
    margin: 10,
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
