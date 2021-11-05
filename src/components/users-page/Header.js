import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";

export function Header({ onClick }) {
    return (
        <Box display='flex' px="12%" justifyContent='space-between' my={5} >
            <Typography color="secondary" component='h1' variant='h5' >Usuarios</Typography>
            <Button onClick={onClick} color='primary' variant='outlined'>Agregar</Button>
        </Box>
    );
}