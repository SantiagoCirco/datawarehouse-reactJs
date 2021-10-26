


const emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const passwordIsValid = (pass) => pass.length >= 6;

export const validateForm = ({ email, password }) => {
    const errors = {};
    if (!email) {
        errors.email = 'Ingresar el correo electrónico.';
    } else if (!emailIsValid(email)) {
        errors.email = 'Debe ingresar un correo válido.';
    }
    if (!password) {
        errors.password = 'El campo no puede quedar vacío';
    } else if (!passwordIsValid(password)) {
        errors.password = 'Debe tener al menos 6 caractéres.';
    }
    return errors;
}


const BASE_URL = 'http://localhost:3000';
const AUTH_URL = BASE_URL + '/v1/auth/login';

export async function sendLoginRequest(credentials) {
    const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    const decodedResponse = await response.json();
    return decodedResponse
}

export const throwLoginError = (response) => {
    const error = new Error(response.message);
    error.name = response.code;
    throw error;
}