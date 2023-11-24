import { Stack, Text } from '@mantine/core';
import { Card } from 'shared/components/Card';
import { Button } from 'shared/components/Buttons';
import { TextArea } from 'shared/components/TextArea';
import { Controller, useForm } from 'react-hook-form';

import style from './AnalysisForm.module.scss';
import { FileInput } from 'shared/components/FileInput';

export const AnalysisForm = () => {
  const { control, watch } = useForm();

  return (
    <Stack spacing={32}>
      <Card w={796}>
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
          <Button
            disabled={!watch('text') && !watch('file')}
            title={`Анализировать`}
          />
        </Stack>
      </Card>
    </Stack>
  );
};
