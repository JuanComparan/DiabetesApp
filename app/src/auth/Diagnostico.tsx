import { Image, View, ScrollView, Text } from "react-native";
import data from './../../../json/data.json';
import images from "../../../assets/images/images";
import TopBar from "../components/TopBar";
import { useEffect, useState } from "react";
import { globalStyles } from "../../../styles/globalStyles";

interface DescriptionItem {
    id: number;
    text: string;
    text2?: string;
    title?: string;
    image?: string;
}


export default function Diagnostico() {
    // Declaramos las variables
    const [description, setDescription] = useState<DescriptionItem[]>([]);

    // Carga inicial de la descripción
    useEffect(() => {
        setDescription(data.Diagnostico || []); // Evita errores si el JSON no tiene la estructura esperada.
    }, []);

    return (
        <View style={globalStyles.mainContainer}>
            <TopBar title="Diagnostico" />
            <View style={globalStyles.middleContainer}>
                <ScrollView>
                    {description.map((description) => (
                        <View key={description.id} style={globalStyles.textContainer}>
                            {description.title && (
                                <Text style={globalStyles.textTitle}>{description.title}</Text>
                            )}
                            <Text style={globalStyles.text}>{description.text}</Text>
                            {description.text2 && (
                                <Text style={globalStyles.text2}>{description.text2}</Text>
                            )}
                            {description.image && (
                                <Image
                                    style={globalStyles.image}
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