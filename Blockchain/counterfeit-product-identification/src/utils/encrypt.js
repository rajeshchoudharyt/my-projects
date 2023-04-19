import AES from "crypto-js/aes";
import UTF8 from "crypto-js/enc-utf8";
import { utils } from "ethers";
import { toast } from "react-toastify";

function getPrivateKey() {
    return process.env.REACT_APP_PRIVATE_KEY;
}

export function encrypt(inputString) {
    const encrypted = AES.encrypt(inputString, getPrivateKey());
    return encrypted.toString();
}

export function decrypt(encryptedString) {
    const decrypted = AES.decrypt(encryptedString, getPrivateKey());
    return decrypted.toString(UTF8);
}

export function toBytes(username) {
    return utils.keccak256(utils.toUtf8Bytes(username));
}

export function checkNetwork() {
    if (!window.navigator.onLine) {
        toast.error("Network Error");
        return false;
    }
    return true;
}
