import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';

import { fetchAllCompanies } from '../../services/companies-service';
import { getCityById } from '../../services/location-service';
import { tokenService } from '../../services/token-service';
import { ErrorCode } from '../../constants';
import { AuthContext } from '../../context/auth-context';

const { UNAUTHORIZED } = ErrorCode;

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    head: {
        backgroundColor: '#f9f9f9',
    },
    h: {
        fontWeight: 'bold',
        textTransform:'uppercase'
    }
});


export function CompaniesTable() {

    const c = useStyles();
    const [companies, setCompanies] = React.useState([]);
    const authContext = React.useContext(AuthContext);

    React.useEffect(() => {
        const authData = tokenService.getTokenFromStorage();
        const token = authData?.token;
        fetchAllCompanies(token)
            .then(response => {
                setCompanies(response);
            })
            .catch(error => {
                if (error.name === UNAUTHORIZED) authContext.logout();
                console.log(error);
            });
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table className={c.table}>
                <TableHead className={c.head}>
                    <TableRow >
                        <TableCell className={c.h} > Empresa</TableCell>
                        <TableCell className={c.h} >País</TableCell>
                        <TableCell className={c.h} > Dirección</TableCell>
                        <TableCell className={c.h} >Email</TableCell>
                        <TableCell className={c.h} align='right' >Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {companies.map((company) => <CompanyTableRow key={company.id} company={company} />)}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


function CompanyTableRow({ company }) {

    const [cityName, setCityName] = React.useState('asdas');
    const authContext = React.useContext(AuthContext);

    React.useEffect(() => {
        const authData = tokenService.getTokenFromStorage();
        const token = authData?.token;
        getCityById(token, company.cityId)
            .then(response => {
                const city = response.data.name;
                setCityName(city);
            })
            .catch(error => {
                if (error.name === UNAUTHORIZED) authContext.logout();
                console.log(error);
            })
    }, []);

    return (
        <TableRow key={company.id}>
            <TableCell component="th" scope="company">
                {company.name}
            </TableCell>
            <TableCell >{cityName}</TableCell>
            <TableCell >{company.adress}</TableCell>
            <TableCell >{company.email}</TableCell>
            <TableCell align='right'>
                <IconButton
                    style={{ marginLeft: '16px' }}>
                    <EditIcon fontSize='small' />
                </IconButton>
                <IconButton
                    style={{ marginLeft: '-8px' }}>
                    <DeleteIcon fontSize='small' />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}