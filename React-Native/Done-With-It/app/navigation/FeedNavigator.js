import React from "react";
const { createStackNavigator } = require("@react-navigation/stack");

import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
    <Stack.Navigator
        screenOptions={{
            presentation: "modal",
            headerShown: false,
        }}>
        <Stack.Screen name="Listings" component={ListingsScreen} />
        <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
    </Stack.Navigator>
);

export default FeedNavigator;