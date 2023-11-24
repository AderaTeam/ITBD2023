import { Stack } from '@mantine/core';
import { useState } from 'react';
import AdminWrapper from 'shared/components/Wrappers/AdminWrapper';
import { IHistory } from 'shared/models/IHistory';
import { HistoryButtonRow } from 'widgets/history-button-row';
import { HistoryTable } from 'widgets/history-table';

const HistoryPage = () => {
  const [result, setResult] = useState<IHistory[]>([
    {
      address: 'Омск, ул. Химиков 6/2',
      tags: [
        { id: 0, name: 'test' },
        { id: 1, name: 'test2' },
      ],
      date: null,
      department: 'Министерство социального развития ПК',
    },
    {
      address: 'Омск, ул. Химиков 6/2',
      tags: [
        { id: 0, name: 'test' },
        { id: 1, name: 'test2' },
      ],
      date: '12.10.2023',
      department: 'Министерство социального развития ПК',
    },
  ]);

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
