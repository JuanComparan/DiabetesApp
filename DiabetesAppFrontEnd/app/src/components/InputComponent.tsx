import { TextInput, View, Text } from "react-native";
import { globalStyles } from "../../../styles/globalStyles";

interface Props {
    text: string,
    value: string,
    variable: (text: string) => void;
    securityPassword?: boolean;
}

export default function InputComponent({ text, value, variable, securityPassword }: Props) {
    return (
        <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.inputText}>{text}</Text>
            <TextInput
                style={globalStyles.input}
                value={value}
                onChangeText={variable}
                secureTextEntry={securityPassword}
            />
        </View>
    )
}