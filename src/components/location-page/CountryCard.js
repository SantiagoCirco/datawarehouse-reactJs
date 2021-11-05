import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyle = makeStyles({
    card:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#fafafa',
        marginLeft:'24px',
        padding:'0 24px',
        '&:hover':{
            backgroundColor:'#f7f7f7',
        }
    },
    title:{
        fontSize:'16px',
        width:'180px',
        textTransform:'uppercase',
        fontWeight:'bold'
    },
});

export function CountryCard({ children, country }) {
    const c = useStyle();

    return (
        <>
            <Box className={c.card} >
                <Typography component='h2' className={c.title}>{country.name}</Typography>
                <Box display='flex' alignItems='center'>
                    <Button variant='text' color='primary'>Agregar ciudad</Button>
                    <IconButton color='primary' sizeSmall style={{ marginLeft: '16px' }}><EditIcon fontSize='small' /></IconButton>
                    <IconButton sizeSmall style={{ marginLeft: '-8px',color:'#f77' }}><DeleteIcon fontSize='small' /></IconButton>
                </Box>
            </Box>
            {children}
        </>
    );
}