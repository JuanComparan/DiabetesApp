import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import { RootStackParamList } from "./RootStackParamList";

// importaciones de pantallas
import Welcome from './home/Welcome';
import Menu from "./auth/Menu";
import QueEs from "./auth/QueEs";
import Dieta from "./auth/Dieta";
import Tratamientos from "./auth/Tratamientos";
import Diagnostico from "./auth/Diagnostico";
import Registro from "./home/Registro";
import Login from "./home/Login";
import ChatBot from "./auth/ChatBot";
import ForgetPassword from "./home/ForgetPassword";
import VerificationCode from './auth/VerificationCode';
import ChangePassword from "./auth/ChangePassword";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    StatusBar.setBackgroundColor("black");
    StatusBar.setBarStyle("light-content");
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
          <Stack.Screen
            name='ForgetPassword'
            component={ForgetPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='VerificationCode'
            component={VerificationCode}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ChangePassword'
            component={ChangePassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ChatBot'
            component={ChatBot}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
