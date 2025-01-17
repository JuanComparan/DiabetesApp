import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import TopBar from "../components/TopBar";

interface Props {
    navigation: StackNavigationProp<any>;
}
export default function Menu({ navigation }: Props) {
    return (
        <View style={styles.mainContainer}>
            <TopBar title="La diabetes" />
            <View style={styles.middleContainer}>
                <View style={styles.descriptionContainer}>
                    <View style={styles.middle}>
                        <TouchableOpacity style={styles.BoxContainer} onPress={() => navigation.navigate('QueEs')}>
                            <Text style={styles.descriptionText}>¿Que es?</Text>
                            <Image
                                source={require('./../../../assets/images/queEs.png')} // Imagen desde URL
                                style={styles.image}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.BoxContainer} onPress={() => navigation.navigate('Diagnostico')}>
                            <Text style={styles.descriptionText}>Diagnostico</Text>
                            <Image
                                source={require('./../../../assets/images/Diagnostico.png')} // Imagen desde URL
                                style={styles.image}
                            />
                        </ TouchableOpacity>
                    </View>
                    <View style={styles.middle}>
                        <TouchableOpacity style={styles.BoxContainer} onPress={() => navigation.navigate('Dieta')}>
                            <Text style={styles.descriptionText}>Dietas</Text>
                            <Image
                                source={require('./../../../assets/images/Dieta.png')} // Imagen desde URL
                                style={styles.image}
                            />
                        </ TouchableOpacity>
                        <TouchableOpacity style={styles.BoxContainer} onPress={() => navigation.navigate('Tratamientos')}>
                            <Text style={styles.descriptionText}>Tratamiento</Text>
                            <Image
                                source={require('./../../../assets/images/Tratamiento.png')} // Imagen desde URL
                                style={styles.image}
                            />
                        </ TouchableOpacity>
                    </View>
                </View>
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
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#29C73D',
        borderBottomWidth: 2,
        borderColor: '#2CDA43'
    },
    textContainer: {
        justifyContent: 'center',
    },
    titleTextContainer: {
        justifyContent: 'center',
        marginTop: 30,
    },
    middleContainer: {
        flex: 4,
        alignItems: 'center',
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
        height: '55%',
        width: '85%',
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#F4F4F4',
        elevation: 10,
    },
    descriptionText: {
        fontSize: 12,
        color: '#4A4A4A',
        fontFamily: 'Kadwa-Regular',
        textAlign: 'center',
    },
    // Textos
    title: {
        fontSize: 45,
        fontFamily: 'Kadwa-Bold',
        color: '#FFFFFF'
    },
    text: {
        fontSize: 30,
        color: '#4A4A4A',
        fontFamily: 'Kadwa-Regular'
    },
    middle: {
        flex: 1,
        flexDirection: "row",
        gap: 10,
    },
    image: {
        width: '50%', // Ancho de la imagen
        height: '50%', // Altura de la imagen
    },
})