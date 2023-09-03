import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Swiper from "react-native-swiper/src";
// import { StyleProp } from 'react-native'
import { colors } from "../styles/style";

// const carouseldata =[
//   {
//     id:1,
//     Image:'../../assets/Offerslidersimages/img1.png',
//   },
//   {
//     id:2,
//     Image:'../../assets/Offerslidersimages/img2.png',
//   },
//   {
//     id:3,
//     Image:'../../assets/Offerslidersimages/img3.png',
//   }
// ]

const OfferSlider = () => {
  return (
    <View>
      <View style={styles.offerSlider}>
        <Swiper
          autoplay={true}
          autoplayTimeout={5}
          showsButtons={true}
          dotColor={colors.text2}
          activeDotColor={colors.text1}
          nextButton={<Text style={styles.buttonText}></Text>}
          prevButton={<Text style={styles.buttonText}></Text>}
        >
          <View style={styles.slide}>
            <Image
              source={require("../assets/OfferSliderImages/img1.png")}
              style={styles.image}
            />
          </View>

          <View style={styles.slide}>
            <Image
              source={require("../assets/OfferSliderImages/img2.png")}
              style={styles.image}
            />
          </View>

          <View style={styles.slide}>
            <Image
              source={require("../assets/OfferSliderImages/img3.png")}
              style={styles.image}
            />
          </View>
        </Swiper>
      </View>
    </View>
  );
};

export default OfferSlider;

const styles = StyleSheet.create({
  offerSlider: {
    width: "100%",
    height: 200,
    backgroundColor: colors.col1,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  slide: {
    width: "100%",
    height: 200,
    backgroundColor: colors.text3,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  }, //,
  // buttonText:{
  //   color:colors.col1,
  //   fontSize:50,
  //   fontWeight:'bold',
  //   backgroundColora:'black',
  //   borderRadius:20,
  //   width:40,
  //   height:40,
  //   textAlign:'center',
  //   lineHeight:40,
  // },
});
