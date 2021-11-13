import { COMPANIES_URL, httpRequest } from "../constants";


export const fetchAllCompanies = async (AccesToken) => {
    const response = await httpRequest(COMPANIES_URL, AccesToken);
    return response;
}