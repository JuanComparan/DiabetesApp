import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import data from './../../../json/data.json';
import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";




export default function Tratamientos() {
   

    return (
        <View style={styles.mainContainer}>
            <TopBar tittle="Tratamientos"/>
            <View style={styles.middleContainer}>
                
            </View>
            <View style={styles.bottomContainer}>
               
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    // Contenedores
    mainContainer: {
        flex: 1
    },
    topScreen: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#29C73D',
        borderBottomWidth: 2,
        borderColor: '#2CDA43'
    },
    textContainer: {
        justifyContent: 'center',
    },
    titleTextContainer: {
        justifyContent: 'center',
        marginTop: 30,
    },
    middleContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    descriptionContainer: {
        height: '70%',
        width: '90%',
        padding: 10,
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#F4F4F4',
        elevation: 10,
    },
    descriptionTextContainer: {
        margin: 5,
    },
    buttonContainer: {
        height: '40%',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#F4F4F4',
        elevation: 10,
    },

    // Textos
    title: {
        fontSize: 45,
        fontFamily: 'Kadwa-Bold',
        color: '#FFFFFF'
    },
    text: {
        fontSize: 30,
        color: '#4A4A4A',
        fontFamily: 'Kadwa-Regular'
    },
    descriptionText: {
        fontSize: 18,
        color: "#4A4A4A",
        fontFamily: 'Kadwa-Regular'
    },
})