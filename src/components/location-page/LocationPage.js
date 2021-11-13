import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';


import { RegionList } from './RegionList';
import { tokenService } from '../../services/token-service';
import { fetchAllRegions,sendAddRegionRequest } from '../../services/location-service';
import { AuthContext } from '../../context/auth-context';
import { ErrorCode } from '../../constants';


const { UNAUTHORIZED } = ErrorCode;

const useStyle = makeStyles({
    container: {
        padding: '2% 10%',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '24px 0'
    },
    card: {
        padding: '16px 32px',
        margin: '8px 0'
    }
});

export function LocationPage() {


    const authContext = React.useContext(AuthContext);
    const c = useStyle();
    const [regions, setRegions] = React.useState([]);
    const [isAdding, setIsAdding] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [regionName, setRegionName] = React.useState('');

    React.useEffect(() => {
        const authData = tokenService.getTokenFromStorage();
        const token = authData?.token;
        (async () => {
            try {
                const response = await fetchAllRegions(token);
                setRegions(response.data);
            } catch (error) {
                if (error.name === UNAUTHORIZED) authContext.logout();
            }
        })();
    }, [authContext]);

    React.useEffect(() => {
        const authData = tokenService.getTokenFromStorage();
        const token = authData?.token;
        if (isSubmitting) {
            const body = {
                name: regionName,
            }
            sendAddRegionRequest(token, body)
                .then(response => {
                    window.location.reload();
                })
                .catch(error => {
                    if (error.name === UNAUTHORIZED) authContext.logout();
                    console.log(error);
                });
        }
    }, [isSubmitting, authContext, regionName]);


    const handleChange = e => setRegionName(e.target.value);

    const handleAddRegion = () => setIsAdding(prev => !prev);

    const handleSubmit = () => {
        setIsSubmitting(true);
    }


    return (

        <Grid className={c.container} container>
            <Grid item xs={12} className={c.buttonContainer}>
                {
                    isAdding &&
                    <>
                        <TextField
                            name='name'
                            variant='outlined'
                            size='small'
                            color='primary'
                            value={regionName}
                            label={'Nueva región'}
                            className={c.input}
                            onChange={handleChange}
                            autoFocus
                        />
                        <IconButton style={{ color: 'green' }} onClick={handleSubmit}>
                            <DoneIcon />
                        </IconButton>
                        <IconButton color='primary' onClick={handleAddRegion}>
                            <CloseIcon />
                        </IconButton>
                    </>
                }
                {
                    isAdding ||
                    <Button onClick={handleAddRegion} variant="outlined" color="primary">Agregar región</Button>
                }
            </Grid>
            <Grid item xs={12}>
                <RegionList regions={regions} />
            </Grid>
        </Grid>
    );
}