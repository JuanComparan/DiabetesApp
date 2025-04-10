import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import Header from "../components/Header";
import { globalStyles } from "../../../styles/globalStyles";
import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";
import { recuperarContrasena } from "../auth/api";
import TextInputCustom from "../components/TextInputCustom";
import { ScrollView } from "react-native-gesture-handler";

type Props = StackScreenProps<any>;

export default function ForgetPassword({ navigation }: Props) {
    // Definimos las variables
    const [email, setEmail] = useState("");

    // Variable para guardar errores
    const [error, setError] = useState<{
        title: string;
        errorMessages: string[];
    } | null>(null);

    const handleAction = async () => {
        console.log("Tapeo");

        console.log(
            "email: ", email,
        )

        //Llamamos al service
        recuperarContrasena(
            navigation,
            email,
            () => console.log("El correo existe"),
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
                    <Header title="Recuperar cuenta" />
                    <View style={[globalStyles.middleScreen, { flex: 2 }]}>
                        <View>
                            <Text style={[globalStyles.text, { textAlign: 'center' }]}>
                                Coloca el correo electronico de tu cuenta
                                para poder verificarlo, si existe te enviaremos un codigo de verificación.
                            </Text>
                        </View>
                        <View style={{paddingVertical: 15}}>
                            <TextInputCustom text="Correo Electronico" value={email} variable={setEmail} />
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
                                    <Text style={globalStyles.buttonText}>ENVIAR</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}