import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';



const useStyle = makeStyles({
    card: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '48px',
        transition:'100ms ease-out',
        '&:hover': {
            backgroundColor: '#eaeafa',
            backgroundImage: 'linear-gradient(270deg,#eaeafa,#ececff,#eaeafa)',
            transition:'ease-in-out 300ms'
        }
    },
    title: {
        width: '180px',
    },

});

export function CityCard({ city }) {

    const c = useStyle();

    return (
        <Box className={c.card}>
            <Typography className={c.title} variant='h6' component='h2'>{city.name}</Typography>
            <Box display='flex'>
                <IconButton color='primary' sizeSmall style={{ marginRight: '-8px', }}><EditIcon style={{ fontSize: '16px', color: '#aaf' }} /></IconButton>
                <IconButton color='primary' sizeSmall style={{ marginRight: '26px' }}><DeleteIcon style={{ fontSize: '16px', color: '#faa' }} /></IconButton>
            </Box>
        </Box>
    );
}