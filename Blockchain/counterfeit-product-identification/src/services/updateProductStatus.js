import getContract from "./getContract";
import { catchError, validateTransaction } from "./common";
import { Loading } from "../components/common/loadingScreen";

export default async function updateProduct(data) {
    const contract = getContract("product");

    Loading();
    const transaction = await callContract(contract, data);
    const isValid = await validateTransaction(transaction, "product");
    Loading();

    return isValid;
}

function callContract(contract, data) {
    const { code, status, sellerId } = data;
    const date = new Date().toUTCString();

    try {
        return contract.updateProductStatus(code, status, sellerId, date);
        //
    } catch (error) {
        return catchError(error);
    }
}
