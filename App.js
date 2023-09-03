import { StyleSheet, Text, View } from "react-native";
import WelcomeScreen from "./src/scene/WelcomeScreen";
import LoginScreen from "./src/scene/LoginScreen";
import ForgotPassword from "./src/scene/ForgotPassword";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupScreen from "./src/scene/SignupScreen";
import HomeScreen from "./src/scene/HomeScreen";
import UserProfile from "./src/scene/UserProfile";
import ProductPage from "./src/scene/ProductPage";
import UserCard from "./src/scene/UserCard";
import PlaceOdar from "./src/components/PlaceOdar";
import TrackOdar from "./src/components/TrackOdar";
import DrawerContent from "./src/components/DrawerContent";
import AboutUs from "./src/components/AboutUs";
import ContactUs from "./src/components/ContactUs";
import Watches from "./src/scene/Watches";
import Ring from "./src/scene/Ring";
import Bracelet from "./src/scene/Bracelet";
import Earring from "./src/scene/Earring";
import Chain from "./src/scene/Chain";
import EditProduct from "./src/scene/EditProduct";
import { loadFonts } from "./src/hooks/usefonts";


export default function App() {

  const fontsLoaded = loadFonts();
  if(!fontsLoaded) return null;

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="welcomepage">
        <Stack.Screen
          name="Welocomepage"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signup"
          component={SignupScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="forgotpassword"
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="userprofile"
          component={UserProfile}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="productpage"
          component={ProductPage}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="card"
          component={UserCard}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="EditProduct"
          component={EditProduct}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="PlaceOdar"
          component={PlaceOdar}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="TrackOdar"
          component={TrackOdar}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="draw"
          component={DrawerContent}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ContactUs"
          component={ContactUs}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="watches"
          component={Watches}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ring"
          component={Ring}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="bracelet"
          component={Bracelet}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="earring"
          component={Earring}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Chain"
          component={Chain}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
