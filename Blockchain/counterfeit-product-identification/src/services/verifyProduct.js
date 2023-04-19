import getContract from "./getContract";
import { toast } from "react-toastify";
import { Loading } from "../components/common/loadingScreen";
import { catchError } from "./common";

export default async function verifyProduct(productCode) {
    const contract = getContract("product");

    Loading();
    const responseMessage = await callContract(contract, productCode);
    // Loading();

    return validateMessage(responseMessage);
}

function callContract(contract, productCode) {
    try {
        return contract.validateProduct(productCode);
        //
    } catch (error) {
        return catchError(error);
    }
}

function validateMessage(message) {
    if (message === "Product already exist") {
        toast.error(message);
        return false;
    }

    return message === "Valid product" ? true : false;
}
