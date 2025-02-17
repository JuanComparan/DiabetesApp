import { Text, View, ScrollView, Image } from "react-native";
import data from './../../../json/data.json';
import images from "../../../assets/images/images";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { globalStyles } from "../../../styles/globalStyles";
import DietTable from "../components/DietTable";

interface DescriptionItem {
    id: number;
    text: string;
    text2?: string;
    title?: string;
    image?: string;
}



export default function Dieta() {
    const [description, setDescription] = useState<DescriptionItem[]>([]);

    // Carga inicial de la descripción
    useEffect(() => {
        setDescription(data.Dietas || []); // Evita errores si el JSON no tiene la estructura esperada.
    }, []);

    return (
        <View style={globalStyles.mainContainer}>
            <Header title="Dietas" />
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
                                    style={globalStyles.image}
                                    source={images[description.image]}
                                />
                            )}
                        </View>
                    ))}
                    <DietTable />
                </ScrollView>
            </View>
        </View>
    );
}