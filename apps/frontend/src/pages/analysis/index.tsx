import { Stack } from "@mantine/core";
import AdminWrapper from "shared/components/Wrappers/AdminWrapper";
import { AnalysisBar } from "widgets/analysis-bar";
import { AnalysisForm } from "widgets/analysis-form";

const AnalysisPage = () => {

  return (
    <AdminWrapper title="Анализ нового обращения">
      <Stack spacing={16}>
        <AnalysisForm/>
        <AnalysisBar/>
      </Stack>
      <></>
    </AdminWrapper>
  );
}

export default AnalysisPage;