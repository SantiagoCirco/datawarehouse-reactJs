import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import { useForm } from '../../hooks/use-form';
import { sendLoginRequest, validateForm, throwLoginError } from '../../services/auth-service';

const useStyles = makeStyles((theme) => ({
    form: {
        textAlign: 'center',
        marginTop: '2em'
    },
    textField: {
        width: '420px',
        marginBottom: '2em',
    },
    submitButton: {
        width: '420px',
        height: '48px',
        marginTop: '3em'
    },
    errorText: {
        color: 'red',
    }
}));


export function LoginForm() {

    const classes = useStyles();

    const {
        values, errors, isSubmiting, handleSubmit, handleChange
    } = useForm(sendLoginRequest, { validateForm, throwLoginError });

    const formHasError = !!errors.form;
    const emailHasError = formHasError ? true : !!errors.email;
    const passwordHasError = formHasError ? true : !!errors.password;

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        name='email'
                        onChange={handleChange}
                        error={emailHasError}
                        helperText={errors.email}
                        value={values.email}
                        className={classes.textField}
                        label='Correo electrónico'
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name='password'
                        onChange={handleChange}
                        error={passwordHasError}
                        helperText={errors.password}
                        type='password'
                        value={values.password}
                        className={classes.textField}
                        label='Contraseña'
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    {formHasError &&
                        <Typography
                            className={classes.errorText}
                            component="h2">
                            {errors.form}
                        </Typography>}
                </Grid>
                <Grid item xs={12}>
                    <Button
                        className={classes.submitButton}
                        color='primary'
                        variant='contained'
                        disableElevation
                        type='submit'
                        size='large'>
                        {isSubmiting && !formHasError ? <CircularProgress /> : 'Ingresar'}
                    </Button>
                </Grid>

            </Grid>
        </form>
    );
}