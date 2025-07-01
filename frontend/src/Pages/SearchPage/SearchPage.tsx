import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import Navbar from '../../Components/NavBar/Navbar'
import Search from '../../Components/Search/Search'
import PortfolioList from '../../Components/Portfolio/PortfolioList/PortfolioList'
import CardList from '../../Components/CardList/CardList'
import { searchCompanies } from '../../api'
import { CompanySearch } from '../../company'

interface SearchPageProps {}

function SearchPage({}: SearchPageProps): JSX.Element {
    const [search, setSearch] = useState<string>('');
    const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [serverError, setServerError] = useState<string>('');

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearch(e.target.value);
    };

    const onSearchSubmit = async (e: SyntheticEvent): Promise<void> => {
        e.preventDefault();
        const result = await searchCompanies(search);
        if (typeof result === 'string') {
            setServerError(result);
        } else {
            if (Array.isArray(result.data)) {
                setSearchResult(result.data);
            }
            console.log(searchResult);
        }
    };

    const onPortfolioCreate = (e: any): void => {
        e.preventDefault();
     
        const exists = portfolioValues.find((value) => value === e.target[0].value);
        if (exists) return;
        const updatedPortfolio = [...portfolioValues, e.target[0].value];
        setPortfolioValues(updatedPortfolio);
    };

    const onPortfolioDelete = (e: SyntheticEvent): void => {
        e.preventDefault();
        const removed = portfolioValues.filter((value) => value !== (e.target as HTMLInputElement).value);
        setPortfolioValues(removed);
    };

    return (
        <>
            <Search 
                onSearchSubmit={onSearchSubmit} 
                search={search} 
                handleSearchChange={handleSearchChange} 
            />
            <PortfolioList 
                portfolioValues={portfolioValues} 
                onPortfolioDelete={onPortfolioDelete} 
            />
            <CardList 
                searchResult={searchResult} 
                onPortfolioCreate={onPortfolioCreate} 
                />
            {serverError && <div>Не удалось подуключиться к API</div>}
        </>
    );
}

export default SearchPage
