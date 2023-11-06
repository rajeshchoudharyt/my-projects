import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";

function WelcomeScreen({ navigation }) {
    return (
        <ImageBackground
            blurRadius={5}
            style={styles.background}
            source={require("../assets/background.jpg")}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require("../assets/logo-red.png")}
                />
                <Text style={styles.tagline}>Sell What We Don't Need</Text>
            </View>
            <View style={styles.buttonContainer}>
                <AppButton
                    title="Login"
                    onPress={() => navigation.navigate("Login")}
                />
                <AppButton
                    title="Register"
                    color="secondary"
                    onPress={() => navigation.navigate("Register")}
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    buttonContainer: {
        padding: 20,
        width: "100%",
    },
    logo: {
        width: 100,
        height: 100,
    },
    logoContainer: {
        alignItems: "center",
        position: "absolute",
        top: 70,
    },
    tagline: {
        fontSize: 20,
        fontWeight: 600,
        paddingVertical: 20,
    },
});

export default WelcomeScreen;
