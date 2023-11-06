import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.usersUrl + "/auth";
const tokenKey = "token";

export async function login(email, password) {
    return http.post(apiEndpoint, { email, password });
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem("email");
}

export function getCurrentUser() {
    return localStorage.getItem("token");
}

const obj = { login, logout, loginWithJwt, getCurrentUser };
export default obj;
