import { SafeAreaView, View, Text, StyleSheet } from "react-native";

interface topbarPropierties {
    title: string
}

export default function TopBar({ title }: topbarPropierties) {
    return (
        <View style={styles.topScreen}>
            <View style={styles.titleTextContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    // Contenedores
    mainContainer: {
        flex: 1
    },
    topScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#58BBF6',
    },
    titleTextContainer: {
        justifyContent: 'center',
        marginTop: 30,
    },
    title: {
        fontSize: 30,
        fontFamily: 'Kadwa-Bold',
        color: '#FFFFFF'
    },

})