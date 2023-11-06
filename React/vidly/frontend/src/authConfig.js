export const msalConfig = {
    auth: {
        clientId: "<client-id>",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "http://localhost:3000"
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false
    }
};

export const loginRequest = {
    scopes: ["User.read"]
};
