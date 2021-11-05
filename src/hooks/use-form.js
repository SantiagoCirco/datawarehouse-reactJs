import { useEffect, useState, useRef } from 'react';


export function useForm(callback, validateForm, initialValues) {

    const ref = useRef(callback);
    ref.current = callback;
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmiting, setIsSubmiting] = useState(false);


    const handleChange = ({ target }) =>
        setValues(prev =>
            ({ ...prev, [target.name]: target.value })
        );

    const handleSubmit =async e => {
        e.preventDefault();
        setErrors(validateForm(values, setValues));
        setIsSubmiting(true);
    }

    useEffect(() => {
        const formIsCorrect = Object.keys(errors).length === 0;
        if (formIsCorrect && isSubmiting) {
            ref.current((error) => setErrors(prev => ({ ...prev, form: error.message })));
        } else {
            setIsSubmiting(false);
        }
    }, [errors, isSubmiting]);

    return { values, errors, isSubmiting, handleChange, handleSubmit }

}