import { Stack } from '@mantine/core';
import AdminWrapper from 'shared/components/Wrappers/AdminWrapper';
import { AnalysisBar } from 'widgets/analysis-bar';
import { AnalysisForm } from 'widgets/analysis-form';
import { AnalysisGuide } from 'widgets/analysis-guide';
import { AnalysisPie } from 'widgets/analysis-pie';

const AnalysisPage = () => {
  return (
    <AdminWrapper title="Анализ нового обращения">
      <Stack spacing={16}>
        <AnalysisForm />
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
