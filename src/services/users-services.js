import { USER_URL, REGISTER_URL, httpRequest } from "../constants";

const emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const passwordIsValid = (pass) => pass.length >= 6;
const passwordAreEqual = (pass, repeatPass) => pass === repeatPass;

export const validateForm = (values, setValues) => {
    const { firstName, lastName, email, password, repeatPassword } = values;
    const errors = {};
    if (!firstName) {
        errors.firstName = 'El campo no puede estar vacío';
    }
    if (!lastName) {
        errors.lastName = 'El campo no puede estar vacío';
    }
    if (!email) {
        errors.email = 'Ingresar el correo electrónico.';
    } else if (!emailIsValid(email)) {
        errors.email = 'Debe ingresar un correo válido.';
    }
    if (!password) {
        errors.password = 'El campo no puede quedar vacío';
    } else if (!passwordIsValid(password)) {
        errors.password = 'Debe tener al menos 6 caractéres.';
    } else if (!passwordAreEqual(password, repeatPassword)) {
        errors.password = 'Las contraseñas deben ser iguales.'
    }
    if (!values.hasOwnProperty('profile')) {
        setValues(prev => ({ ...prev, profile: 'Básico' }));
    }
    return errors;
}


export const fetchAllUsers = async (AccesToken) => {
    const response = await httpRequest(USER_URL, AccesToken)
    return response;
}

export const sendAddUserRequest = async (values, AccesToken) => {
    const response = await httpRequest(REGISTER_URL, AccesToken, {
        method: 'POST',
        body: JSON.stringify(values)
    });
    return response;
}

export const sendDeleteUserRequest = async (id, AccesToken) => {
    const response = await httpRequest(
        `${USER_URL}/${id}`,
        AccesToken, {
        method: 'DELETE',
    });
    return response;
}

export const sendEditUserRequest = async (id, AccesToken, body) => {
    console.log(id);
    const response = await httpRequest(
        `${USER_URL}/${id}`,
        AccesToken, {
        method: 'PUT',
        body: JSON.stringify(body)
    });
    console.log('en la funcion del fetch');
    console.log(response);
    return response;
}