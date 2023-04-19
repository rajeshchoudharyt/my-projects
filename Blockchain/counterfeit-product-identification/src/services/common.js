import { toast } from "react-toastify";
import { Loading } from "../components/common/loadingScreen";

export async function validateTransaction(transaction, usertype = "") {
    const transactionReceipt = await transaction.wait();
    const events = transactionReceipt.events;

    if (events.length === 0) {
        toast.warn("Something went wrong");
        return false;
    }

    const responseMessage = events[0].args.message;

    if (usertype === "product")
        if (responseMessage === "Product does not exist") {
            toast.error(responseMessage);
            return false;
        }

    if (responseMessage === "Successful") {
        toast.success(responseMessage);
        return true;
    }

    return false;
}

export function catchError(error) {
    console.log(error);
    Loading();
    toast.warn("Something went wrong");
    return false;
}
