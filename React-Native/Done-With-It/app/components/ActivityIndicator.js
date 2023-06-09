import React from "react";
import { Platform, View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

function ActivityIndicator({ visible = false }) {
    if (!visible) return null;
    if (Platform.OS === "web") return null;

    return (
        <View style={styles.overlay}>
            <LottieView
                autoPlay
                loop
                source={require("../assets/animations/loader.json")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        position: "absolute",
        zIndex: 1,
        opacity: 0.8,
    },
});

export default ActivityIndicator;
