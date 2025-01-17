import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    // Contenedores
    mainContainer: {
        flex: 1
    },
    middleContainer: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
        margin: 10,
    },
    // Textos
    title: {
        fontSize: 45,
        fontFamily: 'Kadwa-Bold',
        color: '#FFFFFF'
    },
    text: {
        fontSize: 16,
        color: '#4A4A4A',
        fontFamily: 'Kadwa-Regular',
        textAlign: 'justify',
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    text2: {
        fontSize: 16,
        color: '#4A4A4A',
        fontFamily: 'Kadwa-Regular',
        textAlign: 'justify',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    textTitle: {
        textAlign: 'center',
        fontSize: 30,
        marginVertical: 15,
        fontWeight: 'bold',
        color: '#4A4A4A',
    },
    // Imagen
    image: {
        width: "100%",
        height: 300,
        marginVertical: 10,
        resizeMode: 'stretch',
    },
})