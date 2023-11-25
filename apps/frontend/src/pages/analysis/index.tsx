import { Stack } from '@mantine/core';
import { Context } from 'main';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
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
  const { id } = useParams();

  const getResult = (id?: number, step?: number, ids?: number[]) => {
    if (id) {
      AnalysisServices.getAnalysisResult(id)
        .then((response) => {
          step ? AStore.setCurentStep(2) : AStore.setCurentStep(1);
          setResult(response.data);
        })
        .finally(() => setIsLoading(false));
    } else if (ids) {
      try {
        const arr: IResult[][] = [];
        setResult([]);
        ids.map((id) => {
          AnalysisServices.getAnalysisResult(id).then((response) => {
            step ? AStore.setCurentStep(2) : AStore.setCurentStep(1);
            setResult((pervState) => [...pervState, response.data[0]]);
          });
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onSubmit = handleSubmit((formData) => {
    setIsLoading(true);
    if (formData.text) {
      AStore.setAnalysisText(formData.text).then((response) => {
        getResult(response?.data!);
      });
    } else {
      const data = new FormData();
      data.append('file', formData.file);
      AStore.setAnalysisFile(data).then((response) => {
        getResult(undefined, undefined, response?.data);
      });
    }
  });

  useEffect(() => {
    AStore.setCurentStep(0);
    if (id) {
      getResult(+id, 1);
    }
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
        <AnalysisPie result={result} />
      </Stack>
    </AdminWrapper>
  );
};

export default AnalysisPage;
