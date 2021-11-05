
import Box from "@material-ui/core/Box";
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(_ => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: "90vh"
    },
    box: {
        border: '2px solid #eee',
        borderRadius: '4px',
        backgroundColor: '#fefefe',
        padding: '16px',
        textAlign: 'center'
    }
}));

export function NotAdminMessage() {

    const c = useStyles();

    return (
        <Box className={c.container} >
            <Box boxShadow='3' className={c.box}>
                <Typography component='h1' variant='h5' color='textSecondary' >
                    Necesitas permisos de administrador para esta sección
                </Typography><br />
                <LockIcon color='error' />
            </Box>
        </Box>
    );
}