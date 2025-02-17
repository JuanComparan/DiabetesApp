import { Image, View, ScrollView, Text } from "react-native";
import data from './../../../json/data.json';
import images from "../../../assets/images/images";
import Header from "../components/Header";
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
            <Header title="Diagnostico" />
            <View style={globalStyles.middleScreen}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {description.map((description) => (
                        <View key={description.id} style={globalStyles.customTextContainer}>
                            {description.title && (
                                <Text style={globalStyles.textTitle}>{description.title}</Text>
                            )}
                            <Text style={globalStyles.text}>{description.text}</Text>
                            {description.text2 && (
                                <Text style={globalStyles.text2}>{description.text2}</Text>
                            )}
                            {description.image && (
                                <Image
                                    style={globalStyles.image1024x1024}
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