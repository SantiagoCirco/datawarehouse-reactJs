import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';


import { CityCard } from './CityCard';

const useStyle = makeStyles({
    card: {
        marginLeft: '24px',
        marginBottom: '16px',
        backgroundColor: '#f1f1f1',
    },
});

export function CityList({ cities }) {
    const c = useStyle();

   

    if (cities.length !== 0) 
        return (
            <Box className={c.card}>
                {cities.map(city => (
                    <CityCard key={city.id} city={city} />
                ))}
            </Box>
        );
    else return <Box my={2}></Box>
    

}