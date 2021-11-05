import { CITIES_URL, httpRequest } from "../constants";

export const fetchAllRegions = async (AccesToken) => {
    const response = await httpRequest(CITIES_URL, AccesToken);
    return response;
}