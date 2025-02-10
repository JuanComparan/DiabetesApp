import { TextInput, View, Text, StyleSheet, Dimensions } from "react-native";
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

export default function InputComponent({ text, value, variable, securityPassword }: Props) {
    // Variable para definir el ver/ocultar contraseña
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            {!securityPassword ? (
                <View style={globalStyles.inputContainer}>
                    <Text style={globalStyles.inputText}>{text}</Text>
                    <TextInput
                        style={globalStyles.input}
                        value={value}
                        onChangeText={variable}
                    />
                </View>
            ) : (
                <View style={[globalStyles.inputContainer, { width: width * 0.6 }]}>
                    <Text style={[globalStyles.inputText, { paddingLeft: 0 }]}>{text}</Text>
                    <GestureHandlerRootView style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={[globalStyles.input, { width: width * 0.6 }]}
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
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    
})