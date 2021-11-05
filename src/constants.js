

const BASE_URL = 'http://localhost:3000';

export const AUTH_URL = BASE_URL + '/v1/auth';
export const LOGIN_URL = AUTH_URL + '/login';
export const REGISTER_URL = AUTH_URL + '/register';
export const USER_URL = BASE_URL + '/v1/users';
export const REGIONS_URL = BASE_URL + '/v1/regions';
export const COUNTRIES_URL = REGIONS_URL + '/countries';
export const CITIES_URL = COUNTRIES_URL + '/cities';


export function CustomError(name, message) {
    const error = new Error(message);
    error.name = name;
    return error;
}

export const ErrorCode = {
    UNAUTHORIZED: 'UNAUTHORIZED',
    NOT_ADMIN: 'NOT_ADMIN',
    INVALID_TOKEN: 'INVALID_TOKEN',
    SESSION_EXPIRED: 'SESSION_EXPIRED',

}


export const throwCustomError = (response) => {
    const error = new Error(response.message);
    error.name = response.code;
    throw error;
}


export const httpRequest = async (url, AccesToken, config = {}) => {
    const response = await fetch(
        url,
        {
            ...config,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AccesToken}`
            }
        }
    );
    const jsonResponse = await response.json();
    if (!response.ok) {
        throw CustomError(jsonResponse.code, jsonResponse.message);
    }
    return jsonResponse;
}


export const textConfig = {
    add: {
        title: 'Agregar usuario',
        subtitle: 'Los usuarios creados podrán acceder a la plataforma, ver, editar y eliminar recursos.',
        buttonText: 'Agregar',
    },
    edit: {
        title: 'Editar usuario',
        subtitle: 'Modifique los campos que desee e introduzca una nueva contraseña.',
        buttonText: 'Editar',
    }
}