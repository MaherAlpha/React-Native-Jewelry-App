import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../styles/style";
import Chain from "../scene/Chain";

const Categories = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Categories</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity onPress={() => navigation.navigate("earring")}>
          <View style={styles.box}>
            <MaterialCommunityIcons
              name="diamond-stone"
              size={24}
              color="black"
              style={styles.myicon}
            />
            <Text style={styles.mytext}>Earring</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("bracelet")}>
          <View style={styles.box}>
            <MaterialCommunityIcons
              name="gold"
              size={24}
              color="black"
              style={styles.myicon}
            />
            <Text style={styles.mytext}>Bracelet</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ring")}>
          <View style={styles.box}>
            <MaterialCommunityIcons
              name="ring"
              size={24}
              color="black"
              style={styles.myicon}
            />
            <Text style={styles.mytext}>Ring</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("watches")}>
          <View style={styles.box}>
            <MaterialCommunityIcons
              name="watch"
              size={24}
              color="black"
              style={styles.myicon}
            />
            <Text style={styles.mytext}>Watches</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chain")}>
          <View style={styles.box}>
            <MaterialCommunityIcons
              name="watch"
              size={24}
              color="black"
              style={styles.myicon}
            />
            <Text style={styles.mytext}>Chain</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.col1,
    width: "100%",
    margin: 20,
    elevation: 5,
    borderRadius: 10,
  },
  head: {
    color: colors.text1,
    fontSize: 25,
    fontWeight: "500",
    margin: 10,
    // alignSelf: 'center',
    paddingBottom: 5,
    // borderBottomColor: colors.text1,
    // borderBottomWidth: 1,
  },
  box: {
    backgroundColor: colors.col1,
    elevation: 20,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 80,
  },
  myicon: {
    marginRight: 10,
    color: colors.text3,
  },
  mytext: {
    color: colors.text3,
  },
});
