  type Props = {
    config: any;
    data: any;
  };
  
 const Table = ({ config, data }: Props) => {
  const renderedRows = data.map((company: any) => (
    <tr key={company.id}>
      {config.map((val: any, index: number) => (
        <td key={`${company.id}-${index}`} className="p-3">
          {val.render(company)}
        </td>
      ))}
    </tr>
  ));
  
  const renderedHeaders = (
    <tr>
      {config.map((configItem: any, index: number) => (
        <th
          className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          key={index}
        >
          {configItem.label}
        </th>
      ))}
    </tr>
  );
  
  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <table className="min-w-full divide-y divide-gray-200 m-5">
        <thead className="bg-gray-50">
          {renderedHeaders}
        </thead>
        <tbody>
          {renderedRows}
        </tbody>
      </table>
    </div>
  );
};

export default Table;