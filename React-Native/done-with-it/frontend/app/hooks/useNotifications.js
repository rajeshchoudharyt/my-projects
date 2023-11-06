import { useEffect } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

import expoPushTokensApi from "../api/expoPushTokens";
import settings from "../config/settings";

export default useNotifications = (notificationListener) => {
    useEffect(() => {
        registerForPushNotifications();

        if (notificationListener)
            Notifications.addNotificationReceivedListener(notificationListener);
    }, []);

    const registerForPushNotifications = async () => {
        if (Platform.OS !== "android") return;
        try {
            const permission = await Notifications.requestPermissionsAsync();
            if (!permission.granted) return;

            const token = (
                await Notifications.getExpoPushTokenAsync({
                    projectId: settings().projectId,
                })
            ).data;
            expoPushTokensApi.register(token);
        } catch (error) {
            console.log("Error getting a push token", error);
        }
    };
};
