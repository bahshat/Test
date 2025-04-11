import Table from '../components/Table';
import { getReportPageData } from '../common/DummyData';

export default function ReportView({ gotoPageHandler }) {
  const headers = ['Execution Id', 'No Of Test', 'Pass', 'Fail', 'Action'];
  const columnFlex = [1, 1, 1, 1, 1];
  const data = getReportPageData();

  const onRowTap = (index, rowData) => {
    gotoPageHandler('Detail View', { selectedExecutionId: rowData['Execution Id'] });
  };

  const isRowTappable = (rowData) => rowData['Action'] !== 'N/A';

  return (
    <Table
      headers={headers}
      columnFlex={columnFlex}
      data={data}
      onRowTap={onRowTap}
      isRowTappable={isRowTappable}
    />
  );
}