import { TOKEN } from "./constans"
import jtwDecode from 'jwt-decode'

export function setToken(token) {
    localStorage.setItem(TOKEN, token);
}

export function getToken() {
    return localStorage.getItem(TOKEN);
}

export function decodeToken(token) {
    return jtwDecode(token);
}