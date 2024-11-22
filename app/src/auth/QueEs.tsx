import { Image, View, StyleSheet, ScrollView, Text } from "react-native";
import data from './../../../json/data.json';
import images from "../../../assets/images/images";
import TopBar from "../components/TopBar";
import { useEffect, useState } from "react";

interface DescriptionItem {
    id: number;
    text: string;
    text2?: string;
    title?: string;
    image?: string;
}

export default function QueEs() {
    // Declaramos las variables
    const [description, setDescription] = useState<DescriptionItem[]>([]);

    // Carga inicial de la descripción
    useEffect(() => {
        setDescription(data.QueEs || []); // Evita errores si el JSON no tiene la estructura esperada.
    }, []);

    return (
        <View style={styles.mainContainer}>
            <TopBar tittle="¿Qué es la diabetes?" />
            <View style={styles.middleContainer}>
                <ScrollView
                >
                    <View style={styles.textContainer}>
                        <Image
                            source={require("../../../assets/images/diabetesQueEs1.png")}
                            style={styles.image}
                        />
                    </View>
                    {description.map((description) => (
                        <View key={description.id} style={styles.textContainer}>
                            {description.title && (
                                <Text style={styles.textTitle}>{description.title}</Text>
                            )}
                            <Text style={styles.text}>{description.text}</Text>
                            {description.text2 && (
                                <Text style={styles.text2}>{description.text2}</Text>
                            )}
                            {description.image && (
                                <Image
                                    style={styles.image}
                                    source={images[description.image]}
                                />
                            )}
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
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
    },
    text2: {
        fontSize: 16,
        color: '#4A4A4A',
        fontFamily: 'Kadwa-Regular',
        textAlign: 'justify',
        marginTop: 15,
    },
    // Imagen
    image: {
        width: "100%",
        height: 188,
        marginVertical: 10,
        resizeMode: 'cover',
    },
    textTitle: {
        textAlign: 'center',
        fontSize: 24,
        marginVertical: 20,
        fontWeight: 'bold',
        color: '#4A4A4A',
    },
})