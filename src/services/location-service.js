import { CITIES_URL, COUNTRIES_URL, REGIONS_URL, httpRequest } from "../constants";

export const fetchAllRegions = async (AccesToken) => {
    const response = await httpRequest(CITIES_URL, AccesToken);
    return response;
}

export const putCityById = async (AccesToken, cityId, body) => {
    const response = await httpRequest(
        CITIES_URL + '/' + cityId,
        AccesToken,
        {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    return response;
}

export const getCityById = async (AccesToken, cityId) => {
    const response = await httpRequest(
        CITIES_URL + '/' + cityId,
        AccesToken
    );
    return response;
}

export const putCountryById = async (AccesToken, countryId, body) => {
    const response = await httpRequest(
        COUNTRIES_URL + '/' + countryId,
        AccesToken,
        {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    return response;
}

export const deleteCityById = async (AccesToken, cityId) => {
    const response = await httpRequest(
        CITIES_URL + '/' + cityId,
        AccesToken,
        { method: 'DELETE' });
    return response;
}

export const deleteCountryById = async (AccesToken, countryId) => {
    const response = await httpRequest(
        COUNTRIES_URL + '/' + countryId,
        AccesToken,
        { method: 'DELETE' });
    return response;
}

export const sendAddCityRequest = async (AccesToken, body) => {
    const response = await httpRequest(
        CITIES_URL,
        AccesToken,
        {
            method: 'POST',
            body: JSON.stringify(body)
        });
    return response;
}

export const sendAddCountryRequest = async (AccesToken, body) => {
    const response = await httpRequest(
        COUNTRIES_URL,
        AccesToken,
        {
            method: 'POST',
            body: JSON.stringify(body)
        });
    return response;
}

export const sendAddRegionRequest = async (AccesToken, body) => {
    const response = await httpRequest(
        REGIONS_URL,
        AccesToken,
        {
            method: 'POST',
            body: JSON.stringify(body)
        });
    return response;
}

export const validateForm = ({ name }) => {
    if (!name) {
        return { name: 'Ingresar el correo electrónico.' };
    } else {
        return {}
    }
}