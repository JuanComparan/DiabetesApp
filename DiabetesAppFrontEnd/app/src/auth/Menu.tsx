import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import TopBar from "../components/TopBar";
import { globalStyles } from "../../../styles/globalStyles";

interface Props {
    navigation: StackNavigationProp<any>;
}

export default function Menu({ navigation }: Props) {
    return (
        <View style={globalStyles.mainContainer}>
            <TopBar title="La diabetes" />
            <View style={globalStyles.middleContainer}>
                <View style={globalStyles.descriptionContainer}>
                    <View style={globalStyles.middle}>
                        <TouchableOpacity style={globalStyles.BoxContainer} onPress={() => navigation.navigate('QueEs')}>
                            <Text style={globalStyles.descriptionText}>¿Que es?</Text>
                            <Image
                                source={require('./../../../assets/images/queEs.png')} // Imagen desde URL
                                style={globalStyles.iconImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={globalStyles.BoxContainer} onPress={() => navigation.navigate('Diagnostico')}>
                            <Text style={globalStyles.descriptionText}>Diagnostico</Text>
                            <Image
                                source={require('./../../../assets/images/iconoDiagnostico.png')} // Imagen desde URL
                                style={globalStyles.iconImage}
                            />
                        </ TouchableOpacity>
                    </View>
                    <View style={globalStyles.middle}>
                        <TouchableOpacity style={globalStyles.BoxContainer} onPress={() => navigation.navigate('Dieta')}>
                            <Text style={globalStyles.descriptionText}>Dietas</Text>
                            <Image
                                source={require('./../../../assets/images/Dieta.png')} // Imagen desde URL
                                style={globalStyles.iconImage}
                            />
                        </ TouchableOpacity>
                        <TouchableOpacity style={globalStyles.BoxContainer} onPress={() => navigation.navigate('Tratamientos')}>
                            <Text style={globalStyles.descriptionText}>Tratamiento</Text>
                            <Image
                                source={require('./../../../assets/images/iconoTratamiento.png')} // Imagen desde URL
                                style={globalStyles.iconImage}
                            />
                        </ TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}