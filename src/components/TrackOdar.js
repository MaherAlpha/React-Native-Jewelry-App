import React, { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import HomeHeadNav from "../components/HomeHeadNav";
import style, { colors, navbtn, navbtnin, navbtnout } from "../styles/style";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { firebase } from "../services/Firebase/FirebaseConfig.js";

const TrackOrder = ({ navigation }) => {
  const appName = "SuitsyouJewelry";
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    const ordersRef = firebase
      .firestore()
      .collection("UserOrders")
      .where("ordaruseruid", "==", firebase.auth().currentUser.uid);
    ordersRef.onSnapshot((snapshot) => {
      setOrders(snapshot.docs.map((doc) => doc.data()));
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  const convertDate = (date) => {
    let newDate = new Date(date.seconds * 1000);
    return newDate.toDateString();
  };

  const cancelOrder = (order) => {
    const orderRef = firebase
      .firestore()
      .collection("UserOrders")
      .doc(order.ordarid);
    orderRef.update({
      ordarstatus: "cancelled",
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("home")}
          style={styles.navButton}
        >
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{appName}</Text>
      </View>
      <ScrollView style={styles.containerInner}>
        <Text style={styles.heading}>Track Orders</Text>
        {orders
          .sort((a, b) => b.ordardate.seconds - a.ordardate.seconds)
          .map((order, index) => (
            <View style={styles.orderCard} key={index}>
              <Text style={styles.orderIndex}>{index + 1}</Text>
              <Text style={styles.orderText}>Order ID: {order.ordarid}</Text>
              <Text style={styles.orderText}>
                Order Date: {convertDate(order.ordardate)}
              </Text>

              {order.ordarstatus === "ontheway" && (
                <Text style={styles.orderStatus}>Your order is on the way</Text>
              )}
              {order.ordarstatus === "delivered" && (
                <Text style={styles.orderStatus}>Your order is delivered</Text>
              )}
              {order.ordarstatus === "cancelled" && (
                <Text style={styles.orderStatus}>Your order is cancelled</Text>
              )}
              {order.ordarstatus === "pending" && (
                <Text style={styles.orderStatus}>Your order is pending</Text>
              )}

              <View style={styles.row}>
                <Text style={styles.orderText}>Delivery Agent Name</Text>
                <Text style={styles.orderText}>
                  {order.deliveryboy_name || "Not Assigned"}
                </Text>
                {order.deliveryboy_phone && (
                  <Text style={styles.orderText}>
                    {order.deliveryboy_phone}
                  </Text>
                )}
              </View>

              <FlatList
                style={styles.itemList}
                data={order.ordardata}
                keyExtractor={(item) => item.data.jewelryId.toString()}
                renderItem={({ item }) => (
                  <View style={styles.itemRow}>
                    <View style={styles.left}>
                      <Text style={styles.quantity}>
                        {item.Jewelryquantity}
                      </Text>
                      <Text style={styles.title}>{item.data.jewelryName}</Text>
                      <Text style={styles.price}>
                        Rs {item.data.jewelryPrice}
                      </Text>
                    </View>
                    <View style={styles.right}>
                      <Text style={styles.totalPrice}>
                        Rs{" "}
                        {parseInt(item.Jewelryquantity) *
                          parseInt(item.data.jewelryPrice)}
                      </Text>
                    </View>
                  </View>
                )}
              />

              <Text style={styles.totalPrice}>Total: Rs {order.ordarcost}</Text>

              {order.ordarstatus === "Delivered" && (
                <Text style={styles.orderText}>
                  Thank you for ordering with us
                </Text>
              )}
              {order.ordarstatus === "cancelled" && (
                <Text style={styles.orderText}>
                  Sorry for the inconvenience
                </Text>
              )}

              {order.ordarstatus !== "cancelled" &&
                order.ordarstatus !== "delivered" && (
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => cancelOrder(order)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel Order</Text>
                  </TouchableOpacity>
                )}
            </View>
          ))}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>{appName} - All rights reserved</Text>
      </View>
    </View>
  );
};

export default TrackOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.col1,
    width: "100%",
    height: "100%",
  },
  header: {
    backgroundColor: "red",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
  containerInner: {
    marginTop: 10,
    flex: 1,
    backgroundColor: colors.col1,
    width: "100%",
    height: "100%",
    marginBottom: 100,
  },
  heading: {
    fontSize: 30,
    color: colors.text1,
    textAlign: "center",
    marginVertical: 20,
  },
  orderCard: {
    margin: 10,
    elevation: 10,
    backgroundColor: colors.col1,
    padding: 10,
    borderRadius: 10,
  },
  orderIndex: {
    fontSize: 20,
    color: colors.col1,
    backgroundColor: colors.text1,
    textAlign: "center",
    borderRadius: 30,
    padding: 5,
    width: 30,
    position: "absolute",
    top: 10,
    left: 10,
  },
  orderText: {
    fontSize: 17,
    color: colors.text3,
    textAlign: "center",
    marginVertical: 5,
    fontWeight: "bold",
  },
  orderStatus: {
    fontSize: 20,
    backgroundColor: colors.col1,
    color: colors.text3,
    textAlign: "center",
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    justifyContent: "space-between",
  },
  itemList: {
    margin: 10,
    elevation: 10,
    backgroundColor: colors.col1,
    padding: 10,
    borderRadius: 10,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontSize: 20,
    color: colors.text1,
    marginRight: 10,
  },
  title: {
    fontSize: 17,
    color: colors.text1,
    marginRight: 10,
  },
  price: {
    fontSize: 17,
    color: colors.text1,
    marginRight: 10,
  },
  totalPrice: {
    fontSize: 20,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: colors.text1,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: "center",
  },
  cancelButtonText: {
    fontSize: 20,
    color: colors.col1,
    textAlign: "center",
    fontWeight: "bold",
  },
});
