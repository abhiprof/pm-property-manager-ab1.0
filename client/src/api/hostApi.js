import { API_CONSTANTS } from "../constants/hostUrl";
import api from "./axios";
export const addProperties = (payload) => {
    return api.post(API_CONSTANTS.ADD_PROPERTY, payload)
}
