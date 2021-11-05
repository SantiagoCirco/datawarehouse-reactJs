import Typography from '@material-ui/core/Typography';
import { DialogInputField } from './DialogInputField';
import { SelectForm } from './SelectForm';


function UserForm({ handleChange, handleSubmit, errors, values, edit }) {

    const formHasError = !!errors.form;
    const emailHasError = formHasError ? true : !!errors.email;
    const passwordHasError = formHasError ? true : !!errors.password;
    const firstNameHasError = formHasError ? true : !!errors.firstName;
    const lastNameHasError = formHasError ? true : !!errors.lastName;

    return (
        <form onSubmit={handleSubmit}>
            <DialogInputField
                autoFocus
                id="firstName"
                error={firstNameHasError}
                helperText={errors.firstName}
                onChange={handleChange}
                defaultValue={values.firstName}
                label="Nombre"
                type="text"
            />
            <DialogInputField
                id="lastName"
                error={lastNameHasError}
                helperText={errors.lastName}
                defaultValue={values.lastName}
                onChange={handleChange}
                label="Apellido"
                type="text"
            />
            <DialogInputField
                id="email"
                error={emailHasError}
                helperText={errors.email}
                defaultValue={values.email}
                onChange={handleChange}
                label="Email Address"
                type="email"
            />
            <SelectForm
                name='profile'
                onChange={handleChange}
                value={values.profile}
                data={['Básico', 'Admin']} />
            <DialogInputField
                id="password"
                error={passwordHasError}
                helperText={errors.password}
                onChange={handleChange}
                label="Contraseña"
                type="text"
            />
            <DialogInputField
                id="repeatPassword"
                error={passwordHasError}
                helperText={errors.password}
                onChange={handleChange}
                label="Repetir contraseña"
                type="text"
            />
            <Typography
                variant='subtitle2'
                style={{ textAlign: 'center', margin: '16px' }}
                color='error'
                component='p'>
                {formHasError && errors.form}
            </Typography>
        </form>
    );
}


export default UserForm;