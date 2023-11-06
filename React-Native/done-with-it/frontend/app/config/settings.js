import Constants from "expo-constants";

const settings = {
    dev: {
        apiUrl: "http://localhost:9000/api",
        projectId: "expo-project-id",
    },
    staging: {
        apiUrl: "http://localhost:9000/api",
        projectId: "expo-project-id",
    },
    prod: {
        apiUrl: "http://localhost:9000/api",
        projectId: "expo-project-id",
    },
};

const getCurrentSettings = () => {
    if (__DEV__) return settings.dev;
    if (Constants.manifest.releaseChannel === "staging")
        return settings.staging;
    return settings.prod;
};

export default getCurrentSettings;
