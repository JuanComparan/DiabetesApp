import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import Header from "../components/Header";
import { globalStyles } from "../../../styles/globalStyles";
import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";
import { iniciarSesion } from "../auth/api";
import TextInputCustom from "../components/TextInputCustom";
import { ScrollView } from "react-native-gesture-handler";

// Definir el tipo de Props solo con navigation (sin onUserLogin aquí)
type Props = StackScreenProps<any, 'Login'>;

export default function Login({ navigation }: Props) {
    // Definimos las variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Variable para guardar errores
    const [error, setError] = useState<{
        title: string;
        errorMessages: string[];
    } | null>(null);

    const handleAction = async () => {
        console.log("Tapeo");

        console.log(
            "email: ", email,
            "password: ", password,
        )

        //Llamamos al service
        iniciarSesion(
            navigation,
            email,
            password,
            () => console.log("Usuario logueado exitosamente"),
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
                    <Header title="Iniciar Sesión" />
                    <View style={[globalStyles.middleScreen, { flex: 2 }]}>
                        <TextInputCustom text="Correo Electronico" value={email} variable={setEmail} />
                        <TextInputCustom text="Contraseña" value={password} variable={setPassword} securityPassword />
                    </View>
                    <TouchableOpacity style={{alignItems: 'center'}} onPress={() => navigation.navigate("ForgetPassword")}>
                        <Text style={globalStyles.inputText}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
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
                                    <Text style={globalStyles.buttonText}>INGRESAR</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}