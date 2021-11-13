
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";

import { CompaniesTable } from "./CompaniesTable";

const useStyle = makeStyles({
    container: {
        padding: '2% 10%',
    },
    titleBox: {
        margin: '3% 0 5% 0',
    },
    title: {
        fontSize: '1.3rem',
        margin: '15px',
        textTransform: 'uppercase',
    }
});

export function CompaniesPage() {

    const c = useStyle();

    return (
        <Grid container className={c.container}>
            <Grid item xs={12} className={c.titleBox}>
                <Card variant='outlined'>
                    <Box pr={3} display='flex' alignItems='center' justifyContent='space-between'>
                        <Typography variant='h1' className={c.title}>Compañías</Typography>
                        <Button color='primary'>Agregar compañía</Button>
                    </Box>
                </Card>

            </Grid>
            <Grid item xs={12}>
                <CompaniesTable />
            </Grid>
        </Grid>

    );
}