import { Text, View, ScrollView, Image } from "react-native";
import { useEffect, useState } from "react";

import Header from "../components/Header";
import data from "./../../../json/data.json";
import images from "../../../assets/images/images";
import { globalStyles } from "../../../styles/globalStyles";

interface DescriptionItem {
  id: number;
  title?: string;
  text?: string;
  punto1?: string;
  punto2?: string;
  punto3?: string;
  punto4?: string;
  punto41?: string;
  punto42?: string;
  punto5?: string;
  punto6?: string;
  image?: string;
}

export default function Tratamientos() {
  const [description, setDescription] = useState<DescriptionItem[]>([]);

  useEffect(() => {
    setDescription(data.Tratamientos || []);
  }, []);

  return (
    <View style={globalStyles.mainContainer}>
      <Header title="Tratamientos" />
      <View style={globalStyles.middleScreen}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {description.map((description) => (
            <View key={description.id} style={globalStyles.customTextContainer}>
              {description.title && (
                <Text style={globalStyles.textTitle}>{description.title}</Text>
              )}
              {description.text && (
                <Text style={globalStyles.text}>{description.text}</Text>
              )}
              {description.image && (
                <Image
                  style={globalStyles.image1024x1024}
                  source={images[description.image]}
                />
              )}
              {description.punto1 && (
                <Text style={globalStyles.text}>{description.punto1}</Text>
              )}
              {description.punto2 && (
                <Text style={globalStyles.text}>{description.punto2}</Text>
              )}
              {description.punto3 && (
                <Text style={globalStyles.text}>{description.punto3}</Text>
              )}
              {description.punto4 && (
                <Text style={globalStyles.text}>{description.punto4}</Text>
              )}
              {description.punto41 && (
                <Text style={globalStyles.textSubPoint}>{description.punto41}</Text>
              )}
              {description.punto42 && (
                <Text style={globalStyles.textSubPoint}>{description.punto42}</Text>
              )}
              {description.punto5 && (
                <Text style={globalStyles.text}>{description.punto5}</Text>
              )}
            </View>
          ))}
        </ScrollView>
      </View >
    </View >
  );
}