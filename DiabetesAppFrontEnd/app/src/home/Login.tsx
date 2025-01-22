import { View, Text, TouchableOpacity } from "react-native";
import TopBar from "../components/TopBar";
import { globalStyles } from "../../../styles/globalStyles";
import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";
import { iniciarSesion } from "../auth/api";
import InputComponent from "../components/InputComponent";

// Definir el tipo de Props solo con navigation (sin onUserLogin aquí)
type Props = StackScreenProps<any, 'Login'>;

export default function Login({ navigation }: Props) {
    // Definimos las variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Variable para guardar errores
    const [error, setError] = useState<{
        title: string;
        errorMessages: string;
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
        <View style={globalStyles.mainContainer}>
            <TopBar title="Iniciar Sesión" />
            <View style={globalStyles.middleContainer}>
                <InputComponent text="Correo Electronico" value={email} variable={setEmail} />
                <InputComponent text="Contraseña" value={password} variable={setPassword} securityPassword />
            </View>
            <View style={globalStyles.bottomContainer}>
                {error && (
                    <Text style={globalStyles.error}>
                        {error.title}
                    </Text>
                )}
                <View>
                    <TouchableOpacity
                        style={globalStyles.buttonContainer}
                        onPress={handleAction}
                    >
                        <View style={globalStyles.textButtonContainer}>
                            <Text style={globalStyles.buttonText}>Ingresar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}