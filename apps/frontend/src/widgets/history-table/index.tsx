import { Stack } from '@mantine/core';
import { HistoryTableHeader } from './components/HistoryTableHeader';
import { HistoryList } from './components/HistoryList';
import { IHistory } from 'shared/models/IHistory';

interface Props {
  result: IHistory[];
}

export const HistoryTable = ({ result }: Props) => {
  return (
    <Stack spacing={16}>
      <HistoryTableHeader />
      <HistoryList result={result} />
    </Stack>
  );
};
