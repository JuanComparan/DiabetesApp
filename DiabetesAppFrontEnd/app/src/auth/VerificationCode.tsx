import { useState } from "react";
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { verificarCodigo } from "../auth/api";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../../../styles/globalStyles";
import { RootStackParamList } from "../RootStackParamList";
import TextInputCustom from "../components/TextInputCustom";
import Header from "../components/Header";

interface Props {
    navigation: StackNavigationProp<any>;
    route: RouteProp<RootStackParamList, "VerificationCode">;
}

export default function VerificationCode({ navigation, route }: Props) {
    // Definimos las variables
    const [verificationCode, setVerificationCode] = useState("");

    const email = route?.params?.email;

    // Variable para guardar errores
    const [error, setError] = useState<{
        title: string;
        errorMessages: string[];
    } | null>(null);

    const handleAction = async () => {
        console.log("Tapeo");

        console.log(
            "email: ", email,
            "codigo: ", verificationCode
        )

        //Llamamos al service
        verificarCodigo(
            navigation,
            email,
            verificationCode,
            () => console.log("El codigo es correcto."),
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
                    <Header title="Codigo de verificacion" />
                    <View style={[globalStyles.middleScreen, { flex: 2 }]}>
                        <View>
                            <Text style={[globalStyles.text, { textAlign: 'center' }]}>
                                Enviamos un codigo de verificacion a tu correo electronico.
                            </Text>
                        </View>
                        <View style={{ paddingVertical: 15 }}>
                            <TextInputCustom text="Código de verificación" value={verificationCode} variable={setVerificationCode} />
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
                                    <Text style={[globalStyles.buttonText, {fontSize: 27}]}>VERIFICAR CODIGO</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}