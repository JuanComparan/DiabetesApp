import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import data from './../../../json/data.json';
import { useEffect, useState } from "react";

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

    if (!fontsLoaded) {
        return <Text>Loading fonts...</Text>;
    }

    useEffect(() => {
        setDescription(data.Description);
    }, [])

    const itemToShow = description.find(item => item.id === 1);

    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.topScreen}>
                <View style={styles.titleTextContainer}>
                    <Text style={styles.title}>BIENVENIDO</Text>
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
                    <Text>No se encontro la descripcion</Text>
                )}
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("Menu")}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>INGRESAR</Text>
                    </View>
                </TouchableOpacity>
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
})