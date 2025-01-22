import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, StyleSheet } from 'react-native';
import Welcome from './home/Welcome';
import Menu from "./auth/Menu";
import { useEffect } from "react";
import QueEs from "./auth/QueEs";
import Dieta from "./auth/Dieta";
import Tratamientos from "./auth/Tratamientos";
import Diagnostico from "./auth/Diagnostico";
import Registro from "./home/Registro";
import Login from "./home/Login";
const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    StatusBar.setBackgroundColor("black");
    StatusBar.setBarStyle("light-content");
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Welcome'
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: "fade_from_bottom"
        }}
      >
        <Stack.Screen
          name='Welcome'
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Menu'
          component={Menu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='QueEs'
          component={QueEs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Tratamientos'
          component={Tratamientos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Dieta'
          component={Dieta}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Diagnostico'
          component={Diagnostico}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Registro'
          component={Registro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
