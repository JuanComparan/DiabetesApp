import { useState } from "react";
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { cambiarContrasena } from "../auth/api";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../../../styles/globalStyles";
import { RootStackParamList } from "../RootStackParamList";
import TextInputCustom from "../components/TextInputCustom";
import Header from "../components/Header";

interface Props {
    navigation: StackNavigationProp<any>;
    route: RouteProp<RootStackParamList, "ChangePassword">;
}

export default function ChangePassword({ navigation, route }: Props) {
    // Definimos las variables
    const [newPassword, setNewPassword] = useState("");

    const { email } = route.params || {};

    // Variable para guardar errores
    const [error, setError] = useState<{
        title: string;
        errorMessages: string[];
    } | null>(null);

    const handleAction = async () => {
        console.log("Tapeo");

        console.log(
            "email: ", email,
            "newpassword: ", newPassword
        )

        //Llamamos al service
        cambiarContrasena(
            navigation,
            email,
            newPassword,
            () => console.log("Contraseña cambiada exitosamente!"),
            setError
        )
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={globalStyles.mainContainer}>
                    <Header title="Cambiar contraseña" />
                    <View style={[globalStyles.middleScreen, { flex: 2 }]}>
                        <View>
                            <Text style={[globalStyles.text, { textAlign: 'center' }]}>
                                Casi listo, ingresa una contraseña nueva.
                            </Text>
                        </View>
                        <View style={{ paddingVertical: 15 }}>
                            <TextInputCustom text="Contraseña nueva" value={newPassword} variable={setNewPassword} securityPassword/>
                        </View>
                    </View>
                    <View style={globalStyles.bottomScreen}>
                        {error && (
                            <View>
                                <Text style={globalStyles.error}>
                                    {error.title}
                                </Text>
                                <Text style={globalStyles.error}>
                                    {error.errorMessages}
                                </Text>
                            </View>
                        )}
                        <View>
                            <TouchableOpacity
                                style={globalStyles.customButtonContainer}
                                onPress={handleAction}
                            >
                                <View style={globalStyles.textButtonContainer}>
                                    <Text style={[globalStyles.buttonText, {fontSize: 16}]}>CAMBIAR CONTRASEÑA</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}