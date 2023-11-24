import { Stack } from '@mantine/core';
import { HistoryTableHeader } from './components/HistoryTableHeader';

export const HistoryTable = () => {
  return (
    <Stack spacing={16}>
      <HistoryTableHeader />
    </Stack>
  );
};
