import { AuthContextProvider } from "@/context/authContext";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";


export default function RootLayout() {
  
  const colorScheme = useColorScheme();

  const [loadFonts] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  })

  useEffect(() => {
    if (loadFonts) {
      SplashScreen.hideAsync();
    }
  }, [loadFonts]);

  if (!loadFonts) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthContextProvider>
        <Stack screenOptions={{ headerShown: false}}/>
      </AuthContextProvider>
    </ThemeProvider>
  )
}