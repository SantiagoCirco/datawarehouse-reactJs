import { CountryCard } from './CountryCard';
import { CityList } from './CityList';

export function CountryList({ countries }) {

    if (countries.length !== 0) {
        return countries.map(country => (
            <CountryCard key={country.id} country={country}>
                <CityList cities={country.cities} />
            </CountryCard>
        ))
    } else {
        return <div>No hay países...</div>
    }
}