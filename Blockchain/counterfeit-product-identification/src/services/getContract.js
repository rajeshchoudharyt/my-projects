import adminABI from "../contracts/adminLogin.json";
import userABI from "../contracts/userLogin.json";
import productABI from "../contracts/products.json";
import { ethers } from "ethers";

export default function getContract(usertype) {
    const API_KEY = process.env.REACT_APP_API_KEY; // Alchemy API KEY
    const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;

    const { contractAddress, contractABI } = handleUsertype(usertype);

    const alchemyProvider = new ethers.providers.AlchemyProvider(
        "goerli",
        API_KEY
    );
    const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    return contract;
}

function handleUsertype(usertype) {
    let contractAddress = process.env.REACT_APP_USER_CONTRACT_ADDRESS;
    let contractABI = JSON.stringify(userABI);

    if (usertype === "admin") {
        contractAddress = process.env.REACT_APP_ADMIN_CONTRACT_ADDRESS;
        contractABI = JSON.stringify(adminABI);
    }

    if (usertype === "product") {
        contractAddress = process.env.REACT_APP_PRODUCT_CONTRACT_ADDRESS;
        contractABI = JSON.stringify(productABI);
    }

    return { contractAddress, contractABI };
}
