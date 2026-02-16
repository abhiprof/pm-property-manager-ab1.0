import { API_CONSTANTS } from "../constants/hostUrl";
import api from "./axios";

export const addProperties = (payload) => {
    return api.post(API_CONSTANTS.ADD_PROPERTY, payload)
}

export const editProperties=(id,payload)=>{
    return api.put(API_CONSTANTS.EDIT_PROPERTY(id),payload)
}

export const deleteProperties= (id) => {
    return api.delete(API_CONSTANTS.DELETE_PROPERTY(id))
}