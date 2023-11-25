import { Stack } from '@mantine/core';
import { HistoryTableHeader } from './components/HistoryTableHeader';
import { HistoryList } from './components/HistoryList';
import { Control, FieldValues, UseFormSetValue } from 'react-hook-form';
import { IResult } from 'shared/models/IResult';
import { useState } from 'react';

interface Props {
  result: IResult[];
  control: Control<FieldValues, any>;
  setValue: UseFormSetValue<FieldValues>;
}

export const HistoryTable = ({ result, control, setValue }: Props) => {
  const allId = result.map((item) => `${item.id}`);
  const [all, setAll] = useState(false);

  const handleAllSelect = () => {
    setAll(!all);
    if (!all) {
      setValue('analysis', allId);
    } else {
      setValue('analysis', []);
    }
  };

  return (
    <Stack spacing={16}>
      <HistoryTableHeader handleAllSelect={handleAllSelect} />
      <HistoryList control={control} result={result} />
    </Stack>
  );
};
