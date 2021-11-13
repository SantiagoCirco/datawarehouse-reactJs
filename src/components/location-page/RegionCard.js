import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import { AuthContext } from '../../context/auth-context';
import { sendAddCountryRequest } from '../../services/location-service';
import { ErrorCode } from '../../constants';
import { tokenService } from '../../services/token-service';

const { UNAUTHORIZED } = ErrorCode;

const useStyle = makeStyles({
    card: {
        padding: '16px 32px',
        margin: '8px 0'
    }
});

export function RegionCard({ children, region }) {

    const c = useStyle();
    const [isAdding, setIsAdding] = React.useState(false);
    const [isSubmitting,setIsSubmitting] = React.useState(false);
    const [countryName, setCountryName] = React.useState('');
    const authContext = React.useContext(AuthContext);


    React.useEffect(() => {
        const authData = tokenService.getTokenFromStorage();
        const token = authData?.token;
        if (isSubmitting) {
            const body = {
                name: countryName,
                regionId: region.id
            }
            sendAddCountryRequest(token, body)
                .then(response => {
                    window.location.reload();
                })
                .catch(error => {
                    if (error.name === UNAUTHORIZED) authContext.logout();
                    console.log(error);
                });
        }
    }, [isSubmitting, authContext, region.id, countryName]);


    const handleChange = e => setCountryName(e.target.value);

    const handleAddCountry = () => setIsAdding(prev => !prev);

    const handleSubmit = () => {
        setIsSubmitting(true);
    }


    return (
        <Paper className={c.card} square variant='outlined'>
            <Box display='flex' justifyContent='space-between' my={2}>
                <Typography color='primary' variant='h6' component='h2' >{region.name}</Typography>
                {
                    isAdding ?
                        <div>
                            <TextField
                                name='name'
                                variant='outlined'
                                size='small'
                                color='primary'
                                value={countryName}
                                label={'Nuevo País'}
                                className={c.input}
                                onChange={handleChange}
                                autoFocus
                            />
                            <IconButton style={{ color: 'green' }} onClick={handleSubmit}>
                                <DoneIcon />
                            </IconButton>
                            <IconButton color='primary' onClick={handleAddCountry}>
                                <CloseIcon />
                            </IconButton>
                        </div> :
                        <Button onClick={handleAddCountry} variant='text' color='primary'>Agregar País</Button>
                }
            </Box>

            {children}
        </Paper>
    );
}