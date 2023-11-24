import { Stack } from '@mantine/core';
import AdminWrapper from 'shared/components/Wrappers/AdminWrapper';
import { HistoryButtonRow } from 'widgets/history-button-row';
import { HistoryTable } from 'widgets/history-table';

const HistoryPage = () => {
  return (
    <AdminWrapper fullWidth>
      <Stack spacing={16}>
        <HistoryButtonRow />
        <HistoryTable />
      </Stack>
      <></>
    </AdminWrapper>
  );
};

export default HistoryPage;
