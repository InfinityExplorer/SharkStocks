import React, {FC} from 'react'
import Card from '../Card/Card';
import {CompanySearch} from '../../company';
import {v4 as uuidv4} from 'uuid';

interface Props {
  searchResult: CompanySearch[];
  onPortfolioCreate: (e: React.SyntheticEvent) => void;
}

const CardList: FC<Props> = ({searchResult, onPortfolioCreate}: Props): JSX.Element => {
  return (
    <>
      {searchResult.length > 0 ? (
        searchResult.map((result) => (
          <Card
            id={result.symbol}
            key={uuidv4()}
            searchResult={result} 
            onPortfolioCreate={onPortfolioCreate}/>
        ))
      ) : (
        <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
           No results!
        </p>
      )}
    </>
  );
}

export default CardList;
