import React, { useEffect } from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { WarningDialog } from '../users-page/warningDialog';
import { ErrorDialog } from './ErrorDialog';
import { putCityById, deleteCityById } from '../../services/location-service';
import { tokenService } from '../../services/token-service';
import { ErrorCode } from '../../constants';
import { AuthContext } from '../../context/auth-context';

const { UNAUTHORIZED, RESOURCE_NEEDED } = ErrorCode;

const useStyle = makeStyles({
    card: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '48px',
        minHeight: '48px',
        transition: '600ms ease-in',
        '&:hover': {
            backgroundColor: '#eaeafa',
            backgroundImage: 'linear-gradient(270deg,#effdef,#edf2ed,#effdef)',
        }
    },
    title: {
        width: '180px',
    },
    editIcon: {
        fontSize: '16px',
        color: '#aaf'
    },
    deleteIcon: {
        fontSize: '16px',
        color: '#faa',
    },
    input: {
        height: '16px',
        padding: '0',
        fontSize: '8px'
    },
});

export function CityCard({ city }) {

    const c = useStyle();
    const [buttonsAreDisplayed, setButtonsAreDisplayed] = React.useState(false);
    const [isEditting, setIsEditting] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [cityName, setCityName] = React.useState(city.name);
    const [warning, setWarning] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);
    const [deleteError, setDeleteError] = React.useState(false);
    const authContext = React.useContext(AuthContext);

    React.useEffect(() => {
        const authData = tokenService.getTokenFromStorage();
        const token = authData?.token;
        if (isSubmitting) {
            const body = { name: cityName, countryId: city.countryId }
            putCityById(token, city.id, body)
                .then(response => {
                    console.log(response);
                    setIsEditting(false);
                    window.location.reload();
                })
                .catch(error => {
                    if (error.name === UNAUTHORIZED) authContext.logout();
                    console.log(error);
                });
        }
    }, [isSubmitting, city, cityName, authContext]);

    React.useEffect(() => {
        const authData = tokenService.getTokenFromStorage();
        const token = authData?.token;
        if (confirmDelete) {
            deleteCityById(token, city.id)
                .then(response => {
                    console.log(response);
                    window.location.reload();
                })
                .catch(error => {
                    if (error.name === UNAUTHORIZED) authContext.logout();
                    if (error.name === RESOURCE_NEEDED) {
                        setWarning(false);
                        setConfirmDelete(false);
                        setDeleteError(true);
                    }
                    console.log(error);
                });
        }
    }, [confirmDelete, authContext, city.id]);

    const handleMouseLeave = () => {
        if (!isEditting) setButtonsAreDisplayed(false);
    }
    const handleMouseOver = () => setButtonsAreDisplayed(true);

    const handleEdit = (e) => {
        setIsEditting(prev => !prev);
        setCityName(city.name);
    }
    const handleDeleteWarning = (e) => {
        setWarning(true);
    }

    const handleDelete = () => {
        setConfirmDelete(true);
    }

    const handleSubmit = () => {

        console.log('Editado!');
        console.log(city);
        setIsSubmitting(true);
    }
    const handleChange = (e) => {
        setCityName(e.target.value)
    }

    const handleWarningClose = () => setWarning(false);
    const handleDeleteErrorClose = () => setDeleteError(false);

    useEffect(() => {

    }, []);

    return (
        <Box
            className={c.card}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}>
            {warning &&
                <WarningDialog
                    warning={warning}
                    handleClose={handleWarningClose}
                    handleDelete={handleDelete}
                    textContent={{
                        title: 'Eliminar Ciudad',
                        description: `¿Está seguro que desea proceder a eliminar la ciudad de ${city.name} ?`
                    }}
                />
            }
            {deleteError &&
                <ErrorDialog
                    error={deleteError}
                    handleClose={handleDeleteErrorClose}
                    title="No se puede eliminar la ciudad"
                    description="Una o más compañías pertenecen a la ciudad que está intentando eliminar. Por favor, elimine o modifique primero la compañía."

                />
            }
            <Typography
                className={c.title}
                variant='h6'
                component='h2'
            >
                {city.name}
            </Typography>
            {buttonsAreDisplayed &&
                <Box display='flex' mr={3}>
                    {
                        isEditting &&
                        <TextField
                            name='name'
                            variant='outlined'
                            size='small'
                            // defaultValue={city.name}
                            color='primary'
                            value={cityName}
                            label='Editar nombre'
                            className={c.input}
                            onChange={handleChange}
                            autoFocus
                        />
                    }
                    {
                        isEditting &&
                        <IconButton style={{ color: 'green' }} onClick={handleSubmit}>
                            <DoneIcon />
                        </IconButton>
                    }
                    <IconButton color='primary' onClick={handleEdit}>
                        {isEditting ? <CloseIcon /> : <EditIcon className={c.editIcon} />}
                    </IconButton>
                    {
                        !isEditting ?
                            <IconButton color='primary' onClick={handleDeleteWarning}>
                                <DeleteIcon className={c.deleteIcon} />
                            </IconButton>
                            :
                            <Box></Box>
                    }
                </Box>
            }
        </Box >
    );
}