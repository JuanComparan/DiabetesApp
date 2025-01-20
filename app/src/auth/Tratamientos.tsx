import { Text, View, StyleSheet, ScrollView, Pressable,Image } from "react-native";
import { useEffect, useState } from "react";

import TopBar from "../components/TopBar";
import data from "./../../../json/data.json";

interface DescriptionItem {
  id: number;
  title?: string;
  text?: string;
  text2?: string;
  punto1?: string;
  punto2?: string;
  punto3?: string;
  punto4?: string;
  punto41?: string;
  punto42?: string;
  punto5?: string;
  image?: string;
}

export default function Tratamientos() {
  const [description, setDescription] = useState<DescriptionItem[]>([]);
  const [text,setText]=useState <string | null>(null);

  useEffect(() => {
    setDescription(data.Tratamientos || []);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <TopBar title="Tratamientos" />
      <View style={styles.middleContainer}>
        <View style={styles.textContainer}>
        </View>
        {description.map((item) => {
          if (item.title2 && item.title3) {
            return (
              <View key={item.id} style={styles.types}>
                
                <View style={styles.typesContainer}>
                  <Pressable style={styles.typesButton} onPress={()=> setText(item.text2)}>
                    <Text style={styles.textButton}>{item.title2}</Text>
                  </Pressable>
                  <Pressable style={styles.typesButton} onPress={()=>setText(item.text3)}>
                    <Text style={styles.textButton}>{item.title3}</Text>
                  </Pressable>
                </View>

                {/* Contenedor de texto */}
                <View style={styles.informationConatiner}>
                  <ScrollView>
                    <Text style={styles.descriptionText}>{text || "Selecciona una opción para ver más información"}</Text>
                  </ScrollView>
                </View>
              </View>
            );
          }
          return null;
        })}
    
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  // Contenedores
  mainContainer: {
    flex: 1,
  },
  middleContainer: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  types: {
    width: "90%",
    height: "70%",
    borderRadius: 20,
    backgroundColor: "#F4F4F4",
    elevation: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  typesContainer: {
    backgroundColor: "#F4F4F4",
    width: "90%",
    height: "20%",
    marginTop: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  typesButton: {
    backgroundColor: "white",
    width: "40%",
    height: "50%",
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    fontSize: 25,
    color: "#4A4A4A",
    fontFamily: "Kadwa-Regular",
  },
  informationConatiner: {
    backgroundColor: "white",
    width: "80%",
    height: "65%",
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderRadius:10
  },
  descriptionText: {
    fontSize: 18,
    color: "#4A4A4A",
    fontFamily: "Kadwa-Regular",
    textAlign: "center",
  },
  textContainer: {
    flex: 1,
    margin: 10,
  },
  image: {
    height:"90%",
    marginVertical: 10,
    resizeMode: 'cover',
},

});
