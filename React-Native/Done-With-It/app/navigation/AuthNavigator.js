import React from "react";
const { createStackNavigator } = require("@react-navigation/stack");

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
                headerTitleAlign: "center",
            }}
        />
        <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
                headerTitleAlign: "center",
            }}
        />
    </Stack.Navigator>
);

export default AuthNavigator;
