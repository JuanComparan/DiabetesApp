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
    title2?:string;
    text3?: string;
    title3?:string;
    text4?: string;
    title4?:string;
}

export default function Diagnostico() {
    // Declaramos las variables
    const [description, setDescription] = useState<DescriptionItem[]>([]);

    // Carga inicial de la descripción
    useEffect(() => {
        setDescription(data.Diagnostico || []); // Evita errores si el JSON no tiene la estructura esperada.
    }, []);

    return (
        <View style={styles.mainContainer}>
            <TopBar tittle="DIAGNOSTICO" />
            <View style={styles.middleContainer}>
                <ScrollView>
                    {description.map((description) => (
                        <View key={description.id} style={styles.textContainer}>
                            <Image
                                source={require("../../../assets/images/DiabetesDiagnostico.jpg")}
                                style={styles.image}
                            />
                            {description.title && (
                                <Text style={styles.textTitle}>{description.title}</Text>
                                
                            )}
                            {description.text && (
                                   <Text style={styles.text}>{description.text}</Text>
                                
                            )}
                            {description.title2 && (
                                   <Text style={styles.textTitle}>{description.title2}</Text>
                                
                            )}
                            {description.text2 && (
                                   <Text style={styles.text}>{description.text2}</Text>
                            )}
                            {description.title3 && (
                                   <Text style={styles.textTitle}>{description.title3}</Text>
                                
                            )}
                            {description.text3 && (
                                   <Text style={styles.text}>{description.text3}</Text>
                            )}
                            {description.title4 && (
                                <Text style={styles.textTitle}>{description.title4}</Text>
                            )}
                            {description.text4 && (
                                   <Text style={styles.text}>{description.text4}</Text>
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
        flex:1,
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
        fontSize: 30,
        fontWeight: 'bold',
        color: '#4A4A4A',
        marginBottom:10,
    },
})