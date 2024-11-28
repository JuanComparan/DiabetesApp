import { SafeAreaView, View, Text, StyleSheet } from "react-native";

interface topbarPropierties {
    tittle: string
}

export default function TopBar({ tittle }: topbarPropierties) {
    return (
        <View style={styles.topScreen}>
            <View style={styles.titleTextContainer}>
                <Text style={styles.title}>{tittle}</Text>
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
        flex: 1.3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#29C73D',
        borderBottomWidth: 2,
        borderColor: '#2CDA43'
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