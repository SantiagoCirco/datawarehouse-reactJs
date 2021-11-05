import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { LoginForm } from "./LoginForm";
import logo from '../../assets/logo.png';


const useStyles = makeStyles((theme) => ({
    mainLogo: {
        textAlign: 'center',
        margin: '4em 0 1em 0',
    },
    mainLogoImg: {
        width: '250px',
    },
}));

export function LoginPage() {
    const classes = useStyles();

    return (
        <>
            <Grid container>
                <Grid item xs={12} >
                    <div className={classes.mainLogo}>
                        <img className={classes.mainLogoImg} src={logo} alt="Contak logo" />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Typography align='center' component='h2' variant='h6'>
                        Accedé a la plataforma con tu cuenta empresarial
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <LoginForm />
                </Grid>
            </Grid>
        </>
    );
}