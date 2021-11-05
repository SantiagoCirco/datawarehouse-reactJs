import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


import { RegionList } from './RegionList';
import { tokenService } from '../../services/token-service';
import { fetchAllRegions } from '../../services/location-service';
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
        margin:'24px 0'
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


    return (

        <Grid className={c.container} container>
            <Grid item xs={12} className={c.buttonContainer}>
                <Button variant="outlined" color="primary">Agregar región</Button>
            </Grid>
            <Grid item xs={12}>
                <RegionList regions={regions} />
            </Grid>
        </Grid>
    );
}