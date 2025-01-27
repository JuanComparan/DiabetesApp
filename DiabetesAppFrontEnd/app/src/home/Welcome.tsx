import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import data from './../../../json/data.json';
import { useEffect, useState } from "react";
import { globalStyles } from "../../../styles/globalStyles";

interface DescriptionItem {
    id: number;
    text: string;
}

interface Props {
    navigation: StackNavigationProp<any>;
}

export default function Welcome({ navigation }: Props) {
    const [description, setDescription] = useState<DescriptionItem[]>([]);

    const [fontsLoaded] = useFonts({
        "Kadwa-Bold": require("./../../../assets/fonts/Kadwa-Bold.ttf"),
        "Kadwa-Regular": require("./../../../assets/fonts/Kadwa-Regular.ttf"),
    });

    // Carga inicial de la descripción
    useEffect(() => {
        setDescription(data.Bienvenida || []); // Evita errores si el JSON no tiene la estructura esperada.
    }, []);

    const itemToShow = description.find(item => item.id === 1);

    // Mostrar pantalla de carga si las fuentes no están listas
    if (!fontsLoaded) {
        return (
            <View style={styles.mainContainer}>
                <Text>Cargando fuentes...</Text>
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.topScreen}>
                <View style={styles.titleTextContainer}>
                    <Text style={styles.title}>Bienvenido</Text>
                </View>
            </SafeAreaView>
            <View style={styles.middleContainer}>
                {itemToShow ? (
                    <View key={itemToShow.id} style={styles.descriptionContainer}>
                        <View style={styles.descriptionTextContainer}>
                            <Text style={styles.descriptionText}>{itemToShow.text}</Text>
                        </View>
                    </View>
                ) : (
                    <Text>No se encontró la descripción</Text>
                )}
            </View>
            <View style={globalStyles.bottomContainer}>
                <TouchableOpacity
                    style={globalStyles.buttonContainer}
                    onPress={() => navigation.navigate("Login")}
                >
                    <View style={globalStyles.textButtonContainer}>
                        <Text style={globalStyles.buttonText}>INICIAR SESIÓN</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={globalStyles.buttonContainer}
                    onPress={() => navigation.navigate("Registro")}
                >
                    <View style={globalStyles.textButtonContainer}>
                        <Text style={globalStyles.buttonText}>REGISTRO</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
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
        backgroundColor: '#58BBF6',
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
    
    descriptionContainer: {
        height: '70%',
        width: '90%',
        padding: 10,
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#F4F4F4',
        elevation: 10,
    },
    descriptionTextContainer: {
        margin: 5,
        alignSelf: 'center',
    },


    // Textos
    title: {
        fontSize: 45,
        fontFamily: 'Kadwa-Bold',
        color: '#FFFFFF'
    },

    descriptionText: {
        fontSize: 16,
        color: "#4A4A4A",
        fontFamily: 'Kadwa-Regular',
    },
})