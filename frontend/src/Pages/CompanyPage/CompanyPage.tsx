import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { CompanyProfile } from '../../company';
import { getCompanyProfile } from '../../api';
import Sidebar from '../../Components/Sidebar/Sidebar';
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard';
import Tile from '../../Components/Tile/Tile';

interface Props {}

const CompanyPage = (props: Props) => {
  let { ticker } = useParams<{ ticker: string }>();
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        if (ticker) {
          const result = await getCompanyProfile(ticker);
          setCompany(result);
          setError(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        setCompany(null);
      }
    };
    fetchCompany();
  }, [])

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />
          <CompanyDashboard ticker={ticker!}>
            <Tile title="Компания" subtitle={company.companyName}/>
          </CompanyDashboard>
        </div>
    ) : (
      <div>Loading company data...</div>
    )}
  </div>
  )
}

export default CompanyPage