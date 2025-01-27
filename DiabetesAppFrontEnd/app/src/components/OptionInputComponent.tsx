import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
    text: string;
    setSelected: () => void;
    isSelected: boolean | undefined;
}

export default function OptionInputComponent({ text, isSelected, setSelected }: Props) {
    return (
        <Pressable 
            style={[styles.optionButton, 
                isSelected ? styles.selected : styles.unselected,
            ]}
            onPress={setSelected}
        >
            <Text style={[styles.text, 
                { color: isSelected ? "#FFFFFF" : "#000000"},
                ]}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    optionButton: {
        justifyContent: "center",
        width: 60,
        height: 30,
        borderWidth: 1,
        elevation: 3,
        margin: 5,
    },
    selected: {
        backgroundColor: "#58BBF6", // Color para categoría seleccionada
        width: "26%",
        height: 35,
    },
    unselected: {
        backgroundColor: "#FFFFFF", // Color para categoría no seleccionada
    },
    text: {
        fontSize: 15,
        fontFamily: 'Kadwa-Regular',
        textAlign: 'center',
        color: "#00000"
    }
})