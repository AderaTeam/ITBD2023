import { Stack, Text } from '@mantine/core';
import {
  Control,
  Controller,
  FieldValues,
  UseFormWatch,
} from 'react-hook-form';
import { MouseEventHandler } from 'react';

import { TextArea } from 'shared/components/TextArea';
import { FileInput } from 'shared/components/FileInput';
import { Button } from 'shared/components/Buttons';

import style from './Form.module.scss';

interface Props {
  control: Control<FieldValues, any>;
  watch: UseFormWatch<FieldValues>;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
}

export const Form = ({ control, watch, onSubmit }: Props) => {
  return (
    <Stack spacing={20}>
      <Controller
        name="text"
        control={control}
        render={({ field }) => (
          <TextArea field={field} disabled={watch('file')} />
        )}
      />
      <Text className={style.text} color="dark.5">
        или...
      </Text>
      <Controller
        name="file"
        control={control}
        render={({ field }) => (
          <FileInput field={field} disabled={watch('text')} />
        )}
      />
      <Button onClick={onSubmit} disabled={!watch('text') && !watch('file')}>
        {!watch('text') && !watch('file') ? (
          'Анализировать'
        ) : (
          <>
            Анализировать <span className={style.time}>&nbsp; ~ 1 сек</span>
          </>
        )}
      </Button>
    </Stack>
  );
};
