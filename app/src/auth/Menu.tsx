import { SafeAreaView, View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { Image } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import TopBar from "../components/TopBar";

interface Props {
    navigation: StackNavigationProp<any>;
}
export default function Menu ({navigation}:Props) {


    return (
        <View style={styles.mainContainer}>
            <TopBar tittle="menu" />
            <View style={styles.middleContainer}>
                <View style={styles.descriptionContainer}>
                    <View style={styles.descriptionTextContainer}>
                        <View style={styles.middle}>
                        <TouchableOpacity style={styles.BoxContainer}  onPress={() => navigation.navigate('QueEs')}> 
                                <Text  style={styles.descriptionTextContainer}>¿Que es?</Text>
                                <Image 
                                    source={require('./../../../assets/images/queEs.png')} // Imagen desde URL
                                    style={styles.image}
                                />
                        </TouchableOpacity>
                            <TouchableOpacity style={styles.BoxContainer} onPress={() => navigation.navigate('Diagnostico')}>
                                <Text  style={styles.descriptionTextContainer}>Diagnostico</Text>
                                <Image 
                                    source={require('./../../../assets/images/Diagnostico.png')} // Imagen desde URL
                                    style={styles.image}
                                />
                        </ TouchableOpacity>
                        </View>
                        <View style={styles.middle}>
                            <TouchableOpacity style={styles.BoxContainer} onPress={() => navigation.navigate('Dieta')}>
                                <Text  style={styles.descriptionTextContainer}>Dietas</Text>
                                <Image 
                                    source={require('./../../../assets/images/Dieta.png')} // Imagen desde URL
                                    style={styles.image}
                                />
                            </ TouchableOpacity>
                            <TouchableOpacity style={styles.BoxContainer} onPress={() => navigation.navigate('Tratamientos')}>
                                <Text  style={styles.descriptionTextContainer}>Tratamiento</Text>
                                <Image 
                                    source={require('./../../../assets/images/Tratamiento.png')} // Imagen desde URL
                                    style={styles.image}
                                />
                            </ TouchableOpacity>
                        </View> 
                    </View>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                
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
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    descriptionContainer: {
        height: '90%',
        width: '90%',
        padding: 10,
        justifyContent: 'center',
        alignItems:"center",
        borderRadius: 20,
        backgroundColor: '#F4F4F4',
        elevation: 10,
    },
    descriptionTextContainer: {
        margin: 5,
        fontSize: 20,
        color: '#4A4A4A',
        fontFamily: 'Kadwa-Regular'
    },
    buttonContainer: {
        height: '40%',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#F4F4F4',
        elevation: 10,
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
    descriptionText: {
        fontSize: 18,
        color: "#4A4A4A",
        fontFamily: 'Kadwa-Regular'
    },
    BoxContainer:{
        height: '95%',
        width: '50%',
        borderRadius: 25,
        padding:5,
        borderWidth:1,
        //backgroundColor: 'blue',
        marginTop:5,
        margin:2,
        alignItems:"center",
        marginBottom:20,
        
    },
    middle:{
        height:"50%",
        //backgroundColor:"red",
        flexDirection:"row",
        alignItems:"center",
    },
    image: {
        width: "70%", // Ancho de la imagen
        height: "70%", // Altura de la imagen
        borderRadius: 75, // Hacer la imagen circular
        resizeMode:"contain",
      },
})