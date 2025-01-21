import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

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
        width: width * 0.8,
        height: height * 0.25,
        alignSelf: 'center',
        marginVertical: 10,
        resizeMode: 'stretch',
    },
})