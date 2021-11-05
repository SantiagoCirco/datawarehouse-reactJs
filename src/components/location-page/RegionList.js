import { RegionCard } from './RegionCard';
import { CountryList } from './CountryList';


export function RegionList({ regions }) {
    return regions.map(region => (
        <RegionCard region={region}>
            <CountryList countries={region.countries}>
                
            </CountryList>
        </RegionCard>
    ))
}