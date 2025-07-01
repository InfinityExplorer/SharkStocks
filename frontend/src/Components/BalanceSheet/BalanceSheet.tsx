import React, { useEffect, useState } from 'react'
import { CompanyBalanceSheet } from '../../company';
import { useOutletContext } from 'react-router-dom';
import { getBalanceSheet } from '../../api';
import RatioList from '../RatioList/RatioList';

type Props = {}
const config = [
  {
    label: "Денежные средства",
    render: (company: CompanyBalanceSheet) => company.cashAndCashEquivalents,
  },
  {
    label: "Запасы",
    render: (company: CompanyBalanceSheet) => company.inventory,
  },
  {
    label: "Прочие оборотные активы",
    render: (company: CompanyBalanceSheet) => company.otherCurrentAssets,
  },
  {
    label: "Доля меньшинства",
    render: (company: CompanyBalanceSheet) => company.minorityInterest,
  },
  {
    label: "Прочие внеоборотные активы",
    render: (company: CompanyBalanceSheet) => company.otherNonCurrentAssets,
  },
  {
    label: "Долгосрочная задолженность",
    render: (company: CompanyBalanceSheet) => company.longTermDebt,
  },
  {
    label: "Общая задолженность",
    render: (company: CompanyBalanceSheet) => company.totalDebt,  // Исправлено поле
  },
];
function BalanceSheet({}: Props) {
    const ticker = useOutletContext<string>();
    const [balanceSheet, setBalanceSheet] = useState<CompanyBalanceSheet>();
    useEffect(() => {
        const getData = async () => {
            const value = await getBalanceSheet(ticker!);
            setBalanceSheet(value?.data[0]);
        };
        getData();
    }, []);
  return <>  
    {balanceSheet ? (
        <RatioList config={config} data={balanceSheet} />
    ) : (
        <h1>
            Компания не найдена!
        </h1>
    )}
  </>
}

export default BalanceSheet