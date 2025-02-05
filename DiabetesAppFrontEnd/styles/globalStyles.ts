import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
    // Contenedores
    mainContainer: {
        flex: 1,
    },
    topScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#58BBF6',
    },
    middleContainer: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        margin: 2,
    },
    inputContainer: {
        marginVertical: 20,
        width: width * 0.7,
    },
    input: {
        alignSelf: "center",
        width: width * 0.6,
        borderBottomWidth: 1,
        borderColor: "#000000",
        fontSize: 18,
    },
    buttonContainer: {
        height: height * 0.08,
        width: width * 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#F4F4F4',
        elevation: 5,
        marginBottom: 30,
    },
    textButtonContainer: {
        justifyContent: 'center',
    },
    BoxContainer: {
        width: '48%',
        aspectRatio: 1,
        borderRadius: 25,
        elevation: 8,
        backgroundColor: '#FFFFFF',
        alignItems: "center",
        justifyContent: 'center',
    },
    descriptionContainer: {
        height: '70%',
        width: '95%',
        padding: 10,
        borderRadius: 20,
    },
    descriptionContainerMenu: {
        height: '70%',
        width: '90%',
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        backgroundColor: '#F4F4F4',
        elevation: 10,
    },
    descriptionTextContainerMenu: {
        margin: 5,
        alignSelf: 'center',
    },
    middle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
    },
    // Textos
    title: {
        fontSize: 45,
        fontFamily: 'Kadwa-Bold',
        color: '#FFFFFF'
    },
    titleTextContainer: {
        justifyContent: 'center',
        marginTop: 30,
    },
    text: {
        fontSize: 14,
        color: '#4A4A4A',
        fontFamily: 'Kadwa-Regular',
        paddingVertical: 10,
        paddingHorizontal: 8
    },
    buttonText: {
        fontSize: 30,
        color: '#4A4A4A',
        fontFamily: 'Kadwa-Regular'
    },
    text2: {
        fontSize: 14,
        color: '#4A4A4A',
        fontFamily: 'Kadwa-Regular',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    textSubPoint: {
        fontSize: 16,
        color: '#4A4A4A',
        fontFamily: 'Kadwa-Regular',
        textAlign: 'justify',
        paddingVertical: 10,
        paddingHorizontal: 50
    },
    textTitle: {
        textAlign: 'center',
        fontSize: 30,
        marginVertical: 15,
        fontWeight: 'bold',
        color: '#4A4A4A',
    },
    inputText: {
        fontSize: 12,
        fontFamily: "Kadwa-Regular",
        color: "#000000",
        marginBottom: 5,
        paddingLeft: 20,
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginVertical: 10,
        textAlign: 'center',
    },
    descriptionText: {
        fontSize: 12,
        color: '#4A4A4A',
        fontFamily: 'Kadwa-Regular',
        textAlign: 'center',
    },
    descriptionTextMenu: {
        fontSize: 16,
        color: "#4A4A4A",
        fontFamily: 'Kadwa-Regular',
    },
    // Imagen
    image: {
        width: width * 0.8,
        height: height * 0.25,
        alignSelf: 'center',
        marginVertical: 10,
        resizeMode: 'stretch',
    },
    image1024x1024: {
        width: width * 0.9,
        height: height * 0.4,
        alignSelf: 'center',
        marginVertical: 10,
        resizeMode: 'stretch',
    },
    iconImage: {
        width: '50%', // Ancho de la imagen
        height: '50%', // Altura de la imagen
        resizeMode: 'contain'
    },
})