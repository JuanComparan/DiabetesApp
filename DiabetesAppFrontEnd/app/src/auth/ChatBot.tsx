import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import TopBar from "../components/TopBar";
import { globalStyles } from "../../../styles/globalStyles";
import { useState } from "react";
import Respuesta, { enviarMensajeChatBot, register } from "../auth/api";
import InputComponent from "../components/InputComponent";
import { StackScreenProps } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";

type Props = StackScreenProps<any>;

export default function ChatBot() {
    // Definimos las variables
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState<Respuesta | null>(null);

    const handleAction = async () => {
        console.log("Tapeo");

        //Llamamos al service
        enviarMensajeChatBot(
            "juan",
            message,
            setResponse
        )
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={globalStyles.mainContainer}>
                    <TopBar title="Chat bot diabetes app" />
                    <View style={[globalStyles.middleContainer, { flex: 1 }]}>
                        <InputComponent text="Mensaje" value={message} variable={setMessage} />
                        <View style={globalStyles.inputContainer}>
                        </View>
                        <View>
                            <Text>{response?.respuesta}</Text>
                        </View>
                    </View>
                    <View style={globalStyles.bottomContainer}>
                        <View>
                            <TouchableOpacity
                                style={globalStyles.buttonContainer}
                                onPress={handleAction}
                            >
                                <View style={globalStyles.textButtonContainer}>
                                    <Text style={globalStyles.buttonText}>ENVIAR</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View >
            </ScrollView>
        </KeyboardAvoidingView>
    )
}