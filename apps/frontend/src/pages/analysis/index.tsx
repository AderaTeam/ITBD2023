import { Stack } from '@mantine/core';
import { Context } from 'main';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AdminWrapper from 'shared/components/Wrappers/AdminWrapper';
import { IResult } from 'shared/models/IResult';
import AnalysisServices from 'shared/services/AnalysisServices';
import { AnalysisBar } from 'widgets/analysis-bar';
import { AnalysisForm } from 'widgets/analysis-form';
import { AnalysisGuide } from 'widgets/analysis-guide';
import { AnalysisPie } from 'widgets/analysis-pie';
import { AnalysisResult } from 'widgets/analysis-result';

const AnalysisPage = () => {
  const { AStore } = useContext(Context);
  const { control, watch, handleSubmit } = useForm();
  const [result, setResult] = useState<IResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getResult = (id: number) => {
    AnalysisServices.getAnalysisResult(id)
      .then((response) => {
        AStore.curentStep === 1
          ? AStore.setCurentStep(2)
          : AStore.setCurentStep(1);
        setResult(response.data);
      })
      .finally(() => setIsLoading(false));
  };

  const onSubmit = handleSubmit((formData) => {
    setIsLoading(true);
    AStore.setAnalysis(formData.text).then((response) => {
      getResult(response?.data!);
    });
  });

  useEffect(() => {
    AStore.setCurentStep(0);
  }, []);

  return (
    <AdminWrapper title="Анализ нового обращения">
      <Stack spacing={16}>
        {result.length && AStore.curentStep >= 1 ? (
          <AnalysisResult getResult={getResult} result={result} />
        ) : (
          <AnalysisForm
            isLoading={isLoading}
            control={control}
            watch={watch}
            onSubmit={onSubmit}
          />
        )}
        <AnalysisBar length={result.length} />
      </Stack>
      <Stack spacing={10}>
        <AnalysisGuide />
        <AnalysisPie />
      </Stack>
    </AdminWrapper>
  );
};

export default AnalysisPage;
