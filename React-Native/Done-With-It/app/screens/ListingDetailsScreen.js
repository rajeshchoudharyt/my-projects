import React from "react";
import {
    View,
    Image,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
} from "react-native";
// import { Image } from "react-native-expo-image-cache";

import AppText from "../components/AppText";
import ContactSellerForm from "../components/ContactSellerForm";
import ListItem from "../components/ListItem";
import colors from "../config/colors";

function ListingDetailsScreen({ route }) {
    const listing = route.params;

    return (
        <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}>
            <Image
                style={styles.image}
                source={{ uri: listing.images[0].url }}
                tint="light"
            />
            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>{listing.title}</AppText>
                <AppText style={styles.price}>{listing.price}</AppText>
                <View style={styles.userContainer}>
                    <ListItem
                        image={require("../assets/mosh.jpg")}
                        title="Mosh Hamedani"
                        subTitle="5 Listings"
                    />
                </View>
                <ContactSellerForm listing={listing} />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        padding: 20,
    },
    image: {
        width: "100%",
        height: 300,
    },
    price: {
        color: colors.secondary,
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "500",
    },
    userContainer: {
        marginVertical: 30,
    },
});

export default ListingDetailsScreen;
