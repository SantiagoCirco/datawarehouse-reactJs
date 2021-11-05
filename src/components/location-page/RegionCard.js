import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
    card: {
        padding: '16px 32px',
        margin: '8px 0'
    }
});

export function RegionCard({ children, region }) {

    const c = useStyle();

    return (
        <Paper className={c.card} square variant='outlined'>
            <Box display='flex' justifyContent='space-between' my={2}>
                <Typography color='primary' variant='h6' component='h2' >{region.name}</Typography>
                <Button variant='text' color='primary'>Agregar País</Button>
            </Box>
            {children}
        </Paper>
    );
}