import { Stack } from '@mantine/core';
import { Card } from 'shared/components/Card';
import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { Context } from 'main';
import { Form } from './components/Form';
import { Result } from './components/Result';
import AnalysisServices from 'shared/services/AnalysisServices';
import { useForm } from 'react-hook-form';
import { IResult } from 'shared/models/IResult';

export const AnalysisForm = observer(() => {
  const { AStore } = useContext(Context);
  const { control, watch, handleSubmit } = useForm();
  const [result, setResult] = useState<IResult[]>([]);

  const getResult = (id: number) => {
    AnalysisServices.getAnalysisResult(id).then((response) => {
      AStore.setCurentStep();
      console.log(response.data);
      setResult(response.data);
    });
  };

  const onSubmit = handleSubmit((formData) => {
    AStore.setAnalysis(formData.text).then((response) => {
      getResult(response?.data!);
    });
  });

  return (
    <Stack spacing={32}>
      <Card w={796}>
        {AStore.curentStep === 0 ? (
          <Form control={control} watch={watch} onSubmit={onSubmit} />
        ) : (
          <Result result={result} />
        )}
      </Card>
    </Stack>
  );
});
