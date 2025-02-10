import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import TopBar from "../components/TopBar";
import { globalStyles } from "../../../styles/globalStyles";
import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";
import { iniciarSesion, recuperarContrasena, verificarCodigo } from "../auth/api";
import InputComponent from "../components/InputComponent";
import { ScrollView } from "react-native-gesture-handler";

// Definir el tipo de Props solo con navigation (sin onUserLogin aquí)
type Props = StackScreenProps<any>;

export default function VerificationCode({ navigation }: Props) {
    // Definimos las variables
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");

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
        verificarCodigo(
            navigation,
            email,
            verificationCode,
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
                    <TopBar title="Codigo de verificacion" />
                    <View style={[globalStyles.middleContainer, { flex: 2 }]}>
                        <View>
                            <Text style={[globalStyles.text, { textAlign: 'center' }]}>
                                Enviamos un codigo de verificacion a tu correo electronico.
                            </Text>
                        </View>
                        <View style={{paddingVertical: 15}}>
                            <InputComponent text="Correo Electronico" value={email} variable={setEmail} />
                        </View>
                    </View>
                    <View style={globalStyles.bottomContainer}>
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
                                style={globalStyles.buttonContainer}
                                onPress={handleAction}
                            >
                                <View style={globalStyles.textButtonContainer}>
                                    <Text style={globalStyles.buttonText}>VERIFICAR</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}