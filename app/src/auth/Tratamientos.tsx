import { Text, View, StyleSheet, ScrollView, Pressable,Image } from "react-native";
import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import data from "./../../../json/data.json";

interface DescriptionItem {
  id: number;
  text: string;
  title?: string;
  title2: string;
  text2: string;
  image?: string;
  title3: string;
  text3: string;
}

export default function Tratamientos() {
  const [description, setDescription] = useState<DescriptionItem[]>([]);

  useEffect(() => {
    setDescription(data.Tratamientos || []);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <TopBar tittle="Tratamientos" />
      <ScrollView >
      <View style={styles.middleContainer}>
        
        <View style={styles.textContainer}>
                <Image
                source={require("../../../assets/images/diabetesQueEs1.png")}
                style={styles.image}
                />
        </View>
        {description.map((item) => {
          if (item.title2 && item.title3) {
            return (
              <View key={item.id} style={styles.types}>
                
                <View style={styles.typesContainer}>
                  <Pressable style={styles.typesButton}>
                    <Text style={styles.textButton}>{item.title2}</Text>
                  </Pressable>
                  <Pressable style={styles.typesButton}>
                    <Text style={styles.textButton}>{item.title3}</Text>
                  </Pressable>
                </View>

                {/* Contenedor de texto */}
                <View style={styles.informationConatiner}>
                  <ScrollView>
                    <Text style={styles.descriptionText}>{item.text2}</Text>
                  </ScrollView>
                </View>
              </View>
            );
          }
          return null;
        })}
    
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Contenedores
  mainContainer: {
    flex: 1,
  },
  middleContainer: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"blue"
  },
  bottomContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  types: {
    width: "90%",
    height: "80%",
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
    height: "60%",
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
    height: "60%",
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
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
    height:"100%",
    marginVertical: 10,
    resizeMode: 'cover',
},

});
