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
            <View style={globalStyles.mainContainer}>
                <Text>Cargando fuentes...</Text>
            </View>
        );
    }

    return (
        <View style={globalStyles.mainContainer}>
            <SafeAreaView style={[globalStyles.topScreen, {flex: 1.5}]}>
                <View style={globalStyles.titleTextContainer}>
                    <Text style={globalStyles.title}>Bienvenido</Text>
                </View>
            </SafeAreaView>
            <View style={[globalStyles.middleContainer, {flex: 2}]}>
                {itemToShow ? (
                    <View key={itemToShow.id} style={globalStyles.descriptionContainerMenu}>
                        <View style={globalStyles.descriptionTextContainerMenu}>
                            <Text style={globalStyles.descriptionTextMenu}>{itemToShow.text}</Text>
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