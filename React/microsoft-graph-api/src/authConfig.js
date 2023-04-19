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
    scopes: ["Tasks.ReadWrite"]
};

export async function callApi(
    accessToken,
    endPoint = "",
    method = "GET",
    data = {}
) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: method,
        headers: headers
    };

    if (method === "POST") {
        headers.append("Content-Type", "application/json");
        options.body = JSON.stringify(data);
    }

    return fetch(endPoints.getTodoList + endPoint, options)
        .then(response =>
            response.ok
                ? response.json()
                : response.status === 400
                ? alert("Cannot delete default list")
                : response
        )
        .catch(ex => (ex instanceof SyntaxError ? "" : console.log(ex)));
}

export const endPoints = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me/",
    getTodoList: "https://graph.microsoft.com/v1.0/me/todo/lists/"
};
