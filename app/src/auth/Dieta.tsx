import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import data from './../../../json/data.json';
import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";

interface DescriptionItem {
    id: number;
    title?: string;
    text: string;
    title2?: string;
    text2?: string;
    title3?: string;
    text3?: string;
    image?: string;
}



export default function Dieta() {
    const [description, setDescription] = useState<DescriptionItem[]>([]);

    // Carga inicial de la descripción
    useEffect(() => {
        setDescription(data.Dietas|| []); // Evita errores si el JSON no tiene la estructura esperada.
    }, []);

    return (
        <View style={styles.mainContainer}>
            <TopBar title="Dietas"/>
            <View style={styles.middleContainer}>
            <ScrollView>
                    {description.map((description) => (
                        <View key={description.id} style={styles.textContainer}>
                            {description.image && (
                                <Image
                                source={require("../../../assets/images/DIETAS.jpg")}
                                  style={styles.image}
                                />
                            )}
                            {description.title && <Text style={styles.textTitle}>{description.title}</Text>}
                            {description.text && <Text style={styles.text}>{description.text}</Text>}

                            {description.title2 && <Text style={styles.textTitle}>{description.title2}</Text>}
                            {description.text2 && <Text style={styles.text}>{description.text2}</Text>}
                            
                            {description.title3 && <Text style={styles.textTitle}>{description.title3}</Text>}
                            {description.text3 && <Text style={styles.text}>{description.text3}</Text>}

                        
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
    topScreen: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#29C73D',
        borderBottomWidth: 2,
        borderColor: '#2CDA43'
    },
    textContainer: {
        flex: 1,
        margin: 15,
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
        fontSize: 16,
        color: '#4A4A4A',
        fontFamily: 'Kadwa-Regular',
        textAlign: 'justify',  
    },
    descriptionText: {
        fontSize: 18,
        color: "#4A4A4A",
        fontFamily: 'Kadwa-Regular'
    },
    image: {
        width: "100%",
        height: 188,
        marginVertical: 10,
        resizeMode: 'cover',
    },
    textTitle: {
        textAlign: 'center',
        fontSize: 30,
        marginVertical: 20,
        fontWeight: 'bold',
        color: '#4A4A4A',
    },
})