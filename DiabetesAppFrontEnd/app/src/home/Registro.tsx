import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import { globalStyles } from "../../../styles/globalStyles";
import { useState } from "react";
import { register } from "../auth/api";
import TextInputCustom from "../components/TextInputCustom";
import OptionInputComponent from "../components/OptionInputComponent";
import { StackScreenProps } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";

type Props = StackScreenProps<any, 'Registro'>;

export default function Registro({ navigation }: Props) {
    // Definimos las variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [iHaveDiabetes, setIHaveDiabetes] = useState<string | undefined>();
    const [someoneHaveDiabetes, setSomeoneHaveDiabetes] = useState<string | undefined>();

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
            "iHaveDiabetes: ", iHaveDiabetes,
            "someoneHaveDiabetes", someoneHaveDiabetes
        )

        //Llamamos al service
        register(
            navigation,
            email,
            password,
            iHaveDiabetes === 'SI' ? 1 : 0,
            someoneHaveDiabetes === 'NO' ? 0 : 1,
            () => console.log("Se creo el usuario correctamente!!"),
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
                    <Header title="Registro" />
                    <View style={[globalStyles.middleScreen, { flex: 1 }]}>
                        <TextInputCustom text="Correo Electronico" value={email} variable={setEmail} />
                        <TextInputCustom text="Contraseña" value={password} variable={setPassword} securityPassword />
                        <View style={globalStyles.customInputContainer}>
                            <Text style={globalStyles.inputText}>¿Tienes Diabetes?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <OptionInputComponent
                                    text="SI"
                                    isSelected={iHaveDiabetes === 'SI'}
                                    setSelected={() => setIHaveDiabetes('SI')}
                                />
                                <OptionInputComponent
                                    text="NO"
                                    isSelected={iHaveDiabetes === 'NO'}
                                    setSelected={() => setIHaveDiabetes('NO')}
                                />
                            </View>
                        </View>
                        <View style={globalStyles.customInputContainer}>
                            <Text style={globalStyles.inputText}>¿Conoces a alguien con diabetes?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <OptionInputComponent
                                    text="SI"
                                    isSelected={someoneHaveDiabetes === 'SI'}
                                    setSelected={() => setSomeoneHaveDiabetes('SI')}
                                />
                                <OptionInputComponent
                                    text="NO"
                                    isSelected={someoneHaveDiabetes === 'NO'}
                                    setSelected={() => setSomeoneHaveDiabetes('NO')}
                                />
                            </View>
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
                                    <Text style={globalStyles.buttonText}>REGISTRARSE</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View >
            </ScrollView>
        </KeyboardAvoidingView>
    )
}