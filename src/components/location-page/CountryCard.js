import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';

import { sendAddCityRequest, putCountryById, deleteCountryById } from '../../services/location-service';
import { ErrorCode } from '../../constants';
import { AuthContext } from '../../context/auth-context';
import { tokenService } from '../../services/token-service';

import { WarningDialog } from '../users-page/warningDialog';
import { ErrorDialog } from './ErrorDialog';


const { UNAUTHORIZED, RESOURCE_NEEDED } = ErrorCode;

const useStyle = makeStyles({
    card: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        marginLeft: '24px',
        padding: '0 24px',
        '&:hover': {
            backgroundColor: '#f7f7f7',
        }
    },
    title: {
        fontSize: '16px',
        width: '180px',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
});

export function CountryCard({ children, country }) {

    const c = useStyle();
    const [isAdding, setIsAdding] = React.useState(false);
    const [value, setValue] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isEditting, setIsEditting] = React.useState(false);
    const [confirmEdit, setConfirmEdit] = React.useState(false);
    const authContext = React.useContext(AuthContext);
    const [warning, setWarning] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);
    const [deleteError, setDeleteError] = React.useState(false);

    React.useEffect(() => {
        const authData = tokenService.getTokenFromStorage();
        const token = authData?.token;
        if (isSubmitting) {
            const body = {
                name: value,
                countryId: country.id
            }
            sendAddCityRequest(token, body)
                .then(response => {
                    window.location.reload();
                })
                .catch(error => {
                    if (error.name === UNAUTHORIZED) authContext.logout();
                    console.log(error);
                });
        }
    }, [isSubmitting, authContext, country.id, value]);

    React.useEffect(() => {
        const authData = tokenService.getTokenFromStorage();
        const token = authData?.token;
        if (confirmEdit) {
            const body = {
                name: value,
            }
            putCountryById(token, country.id, body)
                .then(response => {
                    console.log(response);
                    window.location.reload();
                })
                .catch(error => {
                    if (error.name === UNAUTHORIZED) authContext.logout();
                    console.log(error);
                });
        }
    }, [confirmEdit, authContext, country.id, value]);

    React.useEffect(() => {
        const authData = tokenService.getTokenFromStorage();
        const token = authData?.token;
        if (confirmDelete) {
            deleteCountryById(token, country.id)
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
    }, [confirmDelete, authContext, country.id]);

    const handleChange = e => setValue(e.target.value);

    const handleAddCity = () => {
        setIsEditting(false);
        setIsAdding(prev => !prev);
    }

    const handleSubmit = () => {
        setIsSubmitting(true);
    }

    const handleEdit = () => {
        setIsAdding(false);
        setIsEditting(prev => !prev);
    }

    const handleConfirmEdit = () => {
        setConfirmEdit(true);
    }

    const handleWarning = () => {
        setWarning(true);
    }

    const handleWarningClose = () => {
        setWarning(false);
    }

    const handleDelete = () => {
        setConfirmDelete(true);
    }

    const handleDeleteErrorClose = () => {
        setDeleteError(false);
    }

    return (
        <>
            <Box className={c.card} >
                <Typography component='h2' className={c.title}>{country.name}</Typography>
                <Box display='flex' alignItems='center'>
                    {warning &&
                        <WarningDialog
                            warning={warning}
                            handleClose={handleWarningClose}
                            handleDelete={handleDelete}
                            textContent={{
                                title: 'Eliminar País',
                                description: `¿Está seguro que desea proceder a eliminar ${country.name} de la lista de países?`
                            }}
                        />
                    }
                    {deleteError &&
                        <ErrorDialog
                            error={deleteError}
                            handleClose={handleDeleteErrorClose}
                            title="No se puede eliminar el país"
                            description="Existen una o más ciudades aderidas al país que está intentando eliminar. Por favor, para evitar conflictos primero elimine cada ciudad que pertenece al país"

                        />
                    }
                    {Boolean(!isAdding && !isEditting) &&
                        <>
                            <Button variant='text' color='primary' onClick={handleAddCity}>Agregar ciudad</Button>
                            <IconButton
                                onClick={handleEdit}
                                color='primary'
                                style={{ marginLeft: '16px' }}>
                                <EditIcon fontSize='small' />
                            </IconButton>
                            <IconButton
                                onClick={handleWarning}
                                style={{ marginLeft: '-8px', color: '#f77' }}>
                                <DeleteIcon fontSize='small' />
                            </IconButton>
                        </>
                    }
                    {
                        Boolean(isAdding || isEditting) &&
                        <>
                            <TextField
                                name='name'
                                variant='outlined'
                                size='small'
                                color='primary'
                                value={value}
                                label={isAdding ? 'Nueva ciudad' : 'Editar País'}
                                className={c.input}
                                onChange={handleChange}
                                autoFocus
                            />
                            <IconButton style={{ color: 'green' }} onClick={isAdding ? handleSubmit : handleConfirmEdit}>
                                <DoneIcon />
                            </IconButton>
                            <IconButton color='primary' onClick={isAdding ? handleAddCity : handleEdit}>
                                <CloseIcon />
                            </IconButton>
                        </>
                    }
                </Box>
            </Box>
            {children}
        </>
    );
}