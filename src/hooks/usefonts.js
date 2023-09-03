import { useFonts } from "expo-font";

export const FONT_REGULAR = "regularTextFont";
export const FONT_MEDIUM = "mediumTextFont";
export const FONT_BOLD = "boldTextFont";

export function loadFonts() {
  const [fontsLoaded] = useFonts({
    regularTextFont: require("../assets/fonts/Montserrat-Regular.ttf"),
    mediumTextFont: require("../assets/fonts/Montserrat-Medium.ttf"),
    boldTextFont: require("../assets/fonts/Montserrat-Bold.ttf"),
  });
  return fontsLoaded;
}
