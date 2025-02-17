import { TextInput, View, Text, Dimensions } from "react-native";
import { globalStyles } from "../../../styles/globalStyles";
import { useState } from "react";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface Props {
    text: string,
    value: string,
    variable: (text: string) => void;
    securityPassword?: boolean;
}

const { width } = Dimensions.get('window');

export default function TextInputCustom({ text, value, variable, securityPassword }: Props) {
    // Variable para definir el ver/ocultar contraseña
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            {!securityPassword ? (
                <View style={globalStyles.customInputContainer}>
                    <Text style={globalStyles.inputText}>{text}</Text>
                    <TextInput
                        style={globalStyles.customInput}
                        value={value}
                        onChangeText={variable}
                    />
                </View>
            ) : (
                <View style={[globalStyles.customInputContainer, { width: width * 0.6 }]}>
                    <Text style={[globalStyles.inputText, { paddingLeft: 0 }]}>{text}</Text>
                    <GestureHandlerRootView style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={[globalStyles.customInput, { width: width * 0.6 }]}
                            value={value}
                            onChangeText={variable}
                            secureTextEntry={!showPassword}
                        />
                        <View style={globalStyles.iconPasswordArea}>
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <MaterialCommunityIcons
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    size={28}
                                    color="black"
                                />
                            </TouchableOpacity>
                        </View>
                    </GestureHandlerRootView>
                </View>
            )}
        </>
    )
};