import React, { useEffect, useState } from 'react'
import { CompanyIncomeStatement } from '../../company';
import { useOutletContext } from 'react-router-dom';
import { getIncomeStatement } from '../../api';
import Table from '../Table/Table';

type Props = {}

const configs = [
  { label: "Дата", render: (c: CompanyIncomeStatement) => c.date },
  { label: "Общая выручка", render: (c: CompanyIncomeStatement) => c.revenue },
  { label: "Чистая прибыль", render: (c: CompanyIncomeStatement) => c.netIncome },
  { label: "Операционные расходы", render: (c: CompanyIncomeStatement) => c.operatingExpenses },
  { label: "Себестоимость выручки", render: (c: CompanyIncomeStatement) => c.costOfRevenue },
];

const IncomeStatement = () => {
  const ticker = useOutletContext<string>();
  const [incomeStatement, setIncomeStatement] = useState<CompanyIncomeStatement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getIncomeStatement(ticker);
        
        // Исправление: убедимся, что получаем массив данных
        if (result && Array.isArray(result)) {
          setIncomeStatement(result);
        } else {
          throw new Error("Неверный формат данных");
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [ticker]);

  // Добавляем уникальные ключи к данным
  const tableDataWithKeys = incomeStatement.map((item, index) => ({
    ...item,
    id: `${item.date}-${index}` // Создаем уникальный ключ
  }));

  if (loading) {
    return <div className="text-center py-8">Загрузка данных...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">Ошибка: {error}</div>;
  }

  if (incomeStatement.length === 0) {
    return <div className="text-gray-500 text-center py-8">Нет данных для отображения</div>;
  }

  return <Table config={configs} data={tableDataWithKeys} />;
};

export default IncomeStatement;