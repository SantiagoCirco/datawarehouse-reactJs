import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import { AuthContext } from '../context/auth-context';
import headerLogo from '../assets/header-logo.png';


const useStyles = makeStyles((theme) => ({
    appBar: {
        minHeight: '70px',
    },
    links: {
        fontSize: '.8em',
        marginLeft: '4em',
        textDecoration: 'none',
        color: 'white',
        textTransform: 'uppercase',
        fontFamily: ' Geneva, Verdana, sans-serif',
        "&:hover": {
            transform: 'scale(1.05,1.05)',
            transition: '200ms'
        }
    }
}));

export function NavBar() {

    const classes = useStyles();
    const authContext = useContext(AuthContext);

    return (
        <AppBar position="static" >
            <Toolbar className={classes.appBar}>
                <img src={headerLogo} alt="logo" />
                {authContext.isLoggedIn &&
                    <Box width='100%' display='flex' justifyContent='flex-end'>
                        <NavLink to='/contacts' className={classes.links}>
                            Contactos
                        </NavLink>
                        <NavLink to='/companies' className={classes.links}>
                            Compañías
                        </NavLink>
                        <NavLink to='/users' className={classes.links}>
                            Usuarios
                        </NavLink>
                        <NavLink to='/location' className={classes.links}>
                            Región / Ciudad
                        </NavLink>
                    </Box>
                }
            </Toolbar>
        </AppBar>
    );
}