import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import { Platform } from "react-native";

const key = "authToken";
const isWeb = Platform.OS === "web";

const storeToken = async (authToken) => {
    try {
        if (isWeb) localStorage.setItem(key, authToken);
        else await SecureStore.setItemAsync(key, authToken);
    } catch (error) {
        console.log("Error storing auth token", error);
    }
};

const getToken = async () => {
    try {
        if (isWeb) return localStorage.getItem(key);
        else return await SecureStore.getItemAsync(key);
    } catch (error) {
        console.log("Error getting the auth token", error);
        return null;
    }
};

const getUser = async () => {
    const token = await getToken();
    return token ? jwtDecode(token) : null;
};

const removeToken = async () => {
    try {
        if (isWeb) localStorage.removeItem(key);
        else await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.log("Error removing the auth token", error);
    }
};

export default { getToken, getUser, removeToken, storeToken };
