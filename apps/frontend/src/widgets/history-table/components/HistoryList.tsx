import { Checkbox, Stack } from '@mantine/core';
import { HistoryItem } from './HistoryItem';
import { IHistory } from 'shared/models/IHistory';
import { Control, Controller, FieldValues } from 'react-hook-form';

interface Props {
  result: IHistory[];
  control: Control<FieldValues, any>;
}

export const HistoryList = ({ result, control }: Props) => {
  return (
    <Controller
      name="analysis"
      control={control}
      render={({ field }) => (
        <Checkbox.Group {...field}>
          <Stack spacing={8}>
            {result.map((item, index) => (
              <HistoryItem key={item.id} index={index} item={item} />
            ))}
          </Stack>
        </Checkbox.Group>
      )}
    />
  );
};
