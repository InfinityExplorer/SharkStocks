import React, { useEffect, useState } from 'react'
import { CompanyKeyMetrics } from '../../company';
import { useOutletContext } from 'react-router';
import { getKeyMetrics } from '../../api';
import RatioList from '../RatioList/RatioList';
type Props = {};

const tableConfig = [
  {
    label: "Стоимость компании (EV)",
    render: (company: CompanyKeyMetrics) => 
      company.enterpriseValueTTM,
    subTitle: "Полная стоимость компании (капитализация + долг - денежные средства)",
  },
  {
    label: "Коэффициент текущей ликвидности",
    render: (company: CompanyKeyMetrics) =>
      company.currentRatioTTM,
    subTitle: "Способность покрывать краткосрочные обязательства",
  },
  {
    label: "Свободный денежный поток на акцию",
    render: (company: CompanyKeyMetrics) =>
      company.freeCashFlowPerShareTTM,
    subTitle: "Свободные денежные средства на одну акцию",
  },
  {
    label: "P/B (Цена/Балансовая стоимость)",
    render: (company: CompanyKeyMetrics) =>
      company.priceToBookRatioTTM,
    subTitle: "Соотношение рыночной цены к балансовой стоимости",
  },
  {
    label: "Дивидендная доходность",
    render: (company: CompanyKeyMetrics) =>
      company.dividendYieldTTM,
    subTitle: "Годовая дивидендная доходность",
  },
  {
    label: "P/E (Цена/Прибыль)",
    render: (company: CompanyKeyMetrics) => 
      company.priceToEarningsRatioTTM,
    subTitle: "Соотношение цены акции к годовой прибыли",
  },
  {
    label: "Debt/Equity",
    render: (company: CompanyKeyMetrics) =>
      company.debtToEquityRatioTTM,
    subTitle: "Соотношение заемного и собственного капитала",
  },
  {
    label: "Рентабельность активов",
    render: (company: CompanyKeyMetrics) =>
      company.netProfitMarginTTM, 
    subTitle: "Чистая рентабельность активов",
  }
];

const CompanyProfile = () => {
  const ticker = useOutletContext<string>()
  const [companyData, setCompanyData] = useState<CompanyKeyMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await getKeyMetrics(ticker)
        setCompanyData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки данных')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
       
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-8">
        {error}
      </div>
    )
  }

  if (!companyData) {
    return (
      <div className="text-gray-500 text-center mt-8">
        Данные не найдены
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <RatioList 
        config={tableConfig} 
        data={companyData} 
      />
    </div>
  )
}


export default CompanyProfile