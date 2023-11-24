import { Stack } from '@mantine/core';
import { HistoryItem } from './HistoryItem';
import { IHistory } from 'shared/models/IHistory';

interface Props {
  result: IHistory[];
}

export const HistoryList = ({ result }: Props) => {
  return (
    <Stack spacing={8}>
      {result.map((item, index) => (
        <HistoryItem index={index} item={item} />
      ))}
    </Stack>
  );
};
