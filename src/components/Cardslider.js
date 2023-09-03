import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import style, {
  colors,
  necklace,
  earring,
  watches,
  bracelet,
  chain,
  ring,
} from "../styles/style";

const Cardslider = ({ title, data, navigation }) => {
  const openProductPage = (item) => {
    navigation.navigate("productpage", item);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cardouthead}>{title}</Text>

      <FlatList
        style={styles.cardsout}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.index}
            onPress={() => {
              openProductPage(item);
            }}
          >
            <View style={styles.card}>
              <View style={styles.s1}>
                <Image
                  source={{ uri: item.jewelryImageUrl }}
                  style={styles.cardimgin}
                />
              </View>

              <View style={styles.s2}>
                <Text style={styles.text1}>{item.jewelryName}</Text>
                <View style={styles.s2in}>
                  <Text style={styles.text2}>Rs.{item.jewelryPrice}/-</Text>

                  {/* {item.jewelryType == 'earring ' ? <Text style = { earring}>
                 </Text> : <Text style={necklace}></Text>} */}

                  {/* 
                 {item.jewelryType === 'earring' ? (
  <Text style={earring}></Text>
) : item.jewelryType === 'necklace' ? (
  <Text style={necklace}></Text>
) : 
  <Text style={watches}></Text>
} */}

                  {item.jewelryType === "earring" ? (
                    <Text style={style.earring}></Text>
                  ) : item.jewelryType === "watches" ? (
                    <Text style={style.watches}></Text>
                  ) : item.jewelryType === "ring" ? (
                    <Text style={style.ring}></Text>
                  ) : item.jewelryType === "necklace" ? (
                    <Text style={style.necklace}></Text>
                  ) : item.jewelryType === "chain" ? (
                    <Text style={style.chain}></Text>
                  ) : (
                    <Text style={style.bracelet}></Text>
                  )}
                </View>
              </View>

              <View style={styles.s3}>
                <Text style={styles.buybtn}>Buy</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Cardslider;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    //  textAlign:'center',
  },
  cardouthead: {
    color: colors.text3,
    width: "90%",
    fontSize: 30,
    fontWeight: "200",
    borderRadius: 10,
    marginHorizontal: 10,
    //textAlign : 'left' ,
  },
  cardsout: {
    width: "100%",
    //  backgroundcolor :'red',
  },
  card: {
    width: 300,
    height: 300,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    backgroundColor: colors.col1,
  },
  cardimgin: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  s2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text1: {
    fontSize: 18,
    color: colors.text3,
    marginHorizontal: 5,
    width: 150,
  },
  text2: {
    fontSize: 20,
    color: colors.text2,
    marginRight: 10,
  },
  s2in: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  s3: {
    alignItems: "center",
    position: "absolute",
    bottom: 1,
    width: "100%",
  },
  buybtn: {
    backgroundColor: colors.text1,
    color: colors.col1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
    borderRadius: 10,
    width: "90%",
    textAlign: "center",
  },
});
