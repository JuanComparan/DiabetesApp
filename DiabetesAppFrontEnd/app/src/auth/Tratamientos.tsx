import { Text, View, StyleSheet, ScrollView, Pressable, Image, Dimensions } from "react-native";
import { useEffect, useState } from "react";

import TopBar from "../components/TopBar";
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
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    setDescription(data.Tratamientos || []);
  }, []);

  return (
    <View style={globalStyles.mainContainer}>
      <TopBar title="Tratamientos" />
      <View style={globalStyles.middleContainer}>
        <ScrollView>
          {description.map((description) => (
            <View key={description.id} style={globalStyles.textContainer}>
              {description.title && (
                <Text style={globalStyles.textTitle}>{description.title}</Text>
              )}
              {description.text && (
                <Text style={globalStyles.text}>{description.text}</Text>
              )}
              {description.image && (
                <Image
                  style={globalStyles.image}
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
                <Text style={styles.textSubPoint}>{description.punto41}</Text>
              )}
              {description.punto42 && (
                <Text style={styles.textSubPoint}>{description.punto42}</Text>
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

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  // Contenedores
  informationConatiner: {
    backgroundColor: "white",
    width: width * 0.97,
    height: height * 0.75,
    marginHorizontal: 5,
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  textSubPoint: {
    fontSize: 16,
    color: '#4A4A4A',
    fontFamily: 'Kadwa-Regular',
    textAlign: 'justify',
    paddingVertical: 10,
    paddingHorizontal: 50
  },
});
