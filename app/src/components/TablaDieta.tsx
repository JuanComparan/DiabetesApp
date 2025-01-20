import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View, Image, Text } from "react-native";
import data from './../../../json/data.json';
import images from "../../../assets/images/images";

interface DescriptionItem {
    id: number;
    title: string;
    text: string;
    image: string;
}

export default function TablaDieta() {
    const [description, setDescription] = useState<DescriptionItem[]>([]);

    // Carga inicial de la descripción
    useEffect(() => {
        setDescription(data.Tabla || []); // Evita errores si el JSON no tiene la estructura esperada.
    }, []);

    // Agrupar los elementos en pares
    const groupedDescription = [];
    for (let i = 0; i < description.length; i += 2) {
        groupedDescription.push(description.slice(i, i + 2));
    }

    return (
        <View style={styles.table}>
            <View style={styles.topTable}>
                <Text style={styles.titleTableText}>Tabla de alimentos recomendados</Text>
            </View>
            {groupedDescription.map((group, index) => (
                <View key={index} style={styles.contentTable}>
                    {group.map((item) => (
                        <View style={styles.boxTable}>
                            <View style={styles.imageBox}>
                                <Image
                                    style={styles.image}
                                    source={images[item.image]}
                                />
                            </View>
                            <View style={styles.textBox}>
                                <View style={styles.titleArea}>
                                    <Text style={styles.title}>{item.title}</Text>
                                </View>
                                <View style={styles.textArea}>
                                    <Text style={styles.text}>{item.text}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            ))}
        </View>
    )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    table: {
        width: width * 0.98,
        height: height * 0.85,
        marginHorizontal: 4,
        backgroundColor: '#F5EFE7'
    },
    topTable: {
        flex: 0.75,
        borderWidth: 1,
        borderColor: '#FCFDC0',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentTable: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
    },
    boxTable: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
    },
    imageBox: {
        flex: 1,
    },
    textBox: {
        flex: 1,
    },
    titleArea: {
        flex: 0.5,
    },
    textArea: {
        flex: 1,
    },
    // Imagen
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    // Texto
    text: {
        fontSize: 12,
        textAlign: 'center'
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'semibold'
    },
    titleTableText : {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});