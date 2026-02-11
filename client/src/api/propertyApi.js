import api from "./axios";
import { API_CONSTANTS } from "../constants/hostUrl";
export const fetchProperties = () => {
    return api.get('/')
}
export const fetchPropertiesId = (id) => {
    return api.get(API_CONSTANTS.FETCH_PROPERTY(id))
}