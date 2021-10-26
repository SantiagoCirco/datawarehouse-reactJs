import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../context/auth-context';


export function useForm(sendLoginRequest, { validateForm, throwLoginError }) {

    const initValues = { email: '', password: '', };
    let history = useHistory();

    const authContext = useContext(AuthContext);
    const [values, setValues] = useState(initValues);
    const [errors, setErrors] = useState({});
    const [isSubmiting, setIsSubmiting] = useState(false);

    const handleChange = ({ target }) =>
        setValues(prev =>
            ({ ...prev, [target.name]: target.value })
        );

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors(validateForm(values));
        setIsSubmiting(true);
    }

    useEffect(() => {
        const formIsCorrect = Object.keys(errors).length === 0;
        if (formIsCorrect && isSubmiting) {
            (async () => {
                try {
                    const response = await sendLoginRequest(values);
                    if (!response.ok) throwLoginError(response);
                    authContext.login(response.data);
                } catch (error) {
                    setErrors(prev => ({ ...prev, form: error.message }));
                } finally {
                    setIsSubmiting(false)
                }
            })();
        }
    }, [errors]);

    return { values, errors, isSubmiting, handleChange, handleSubmit }

}