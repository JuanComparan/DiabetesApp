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

export default function QueEs() {
    // Declaramos las variables
    const [description, setDescription] = useState<DescriptionItem[]>([]);

    // Carga inicial de la descripción
    useEffect(() => {
        setDescription(data.QueEs || []); // Evita errores si el JSON no tiene la estructura esperada.
    }, []);

    return (
        <View style={globalStyles.mainContainer}>
            <Header title="¿Qué es la diabetes?" />
            <View style={globalStyles.middleScreen}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={globalStyles.customTextContainer}>
                        <Image
                            source={require("../../../assets/images/diabetesQueEs1.png")}
                            style={globalStyles.image}
                        />
                    </View>
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
                                    style={[
                                        description.id === 1
                                            ? globalStyles.image
                                            : (description.id === 2 || description.id === 3)
                                            ? globalStyles.image1024x1024
                                            : globalStyles.image
                                    ]}
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