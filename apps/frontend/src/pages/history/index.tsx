import { Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import AdminWrapper from 'shared/components/Wrappers/AdminWrapper';
import { IResult } from 'shared/models/IResult';
import HistoryServices from 'shared/services/HistoryServices';
import { HistoryButtonRow } from 'widgets/history-button-row';
import { HistoryTable } from 'widgets/history-table';

const HistoryPage = () => {
  const [result, setResult] = useState<IResult[]>([]);

  useEffect(() => {
    HistoryServices.getHistory().then((response) => setResult(response.data));
  }, []);

  return (
    <AdminWrapper fullWidth>
      <Stack spacing={16}>
        <HistoryButtonRow />
        <HistoryTable result={result} />
      </Stack>
      <></>
    </AdminWrapper>
  );
};

export default HistoryPage;
