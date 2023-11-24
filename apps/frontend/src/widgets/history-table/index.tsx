import { Stack } from '@mantine/core';
import { HistoryTableHeader } from './components/HistoryTableHeader';
import { HistoryList } from './components/HistoryList';
import { IHistory } from 'shared/models/IHistory';
import { useForm } from 'react-hook-form';

interface Props {
  result: IHistory[];
}

export const HistoryTable = ({ result }: Props) => {
  const allId = result.map((item) => item.id);
  const { control, setValue } = useForm();

  const handleAllSelect = () => {
    setValue('annalysis', allId);
  };

  return (
    <Stack spacing={16}>
      <HistoryTableHeader handleAllSelect={handleAllSelect} />
      <HistoryList control={control} result={result} />
    </Stack>
  );
};
