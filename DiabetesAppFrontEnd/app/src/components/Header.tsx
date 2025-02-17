import { View, Text } from "react-native";
import { globalStyles } from "../../../styles/globalStyles";

interface topbarPropierties {
    title: string
}

export default function Header({ title }: topbarPropierties) {
    return (
        <View style={globalStyles.topScreen}>
            <View style={globalStyles.titleTextContainer}>
                <Text style={[globalStyles.title, { fontSize: 30 }]}>{title}</Text>
            </View>
        </View>
    )
}