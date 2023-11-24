import { Stack } from '@mantine/core';
import { Context } from 'main';
import { useContext, useState } from 'react';
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
  const [result, setResult] = useState<IResult[]>([
    {
      id: 2,
      text: 'Добрый день! А врача на дом можно будет вызвать?',
      address: 'Магистральная 50',
      group: 'Здравоохранение/Медицина',
      category: 'Технические проблемы с записью на прием к врачу',
      department: 'Министерство здравоохранения',
      tags: ['врача', 'вызвать'],
    },
    {
      id: 3,
      text: 'А второй люк остался открытым, и там не видно дна, т. е. Глубины большой.',
      address: 'Ленина 20',
      group: 'Благоустройство',
      category: 'Открытые канализационные люки',
      department: 'Губахинский городской округ',
      tags: ['люк', 'открытым'],
    },
  ]);

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
    <AdminWrapper title="Анализ нового обращения">
      <Stack spacing={16}>
        {result.length && AStore.curentStep === 1 ? (
          <AnalysisResult result={result} />
        ) : (
          <AnalysisForm control={control} watch={watch} onSubmit={onSubmit} />
        )}
        <AnalysisBar />
      </Stack>
      <Stack spacing={10}>
        <AnalysisGuide />
        <AnalysisPie />
      </Stack>
    </AdminWrapper>
  );
};

export default AnalysisPage;
