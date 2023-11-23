import { Stack } from "@mantine/core";
import { Card } from "shared/components/Card";
import { Button } from "shared/components/Buttons";
import { TextArea } from "shared/components/TextArea";
import { Segment } from "shared/components/Segment";

export const AnalysisForm = () => {

  return (
    <Stack spacing={32}>
      <Card>
        <Stack spacing={20}>
          <Segment data={['12', '13']}/>
          <TextArea/>
          <Button title={`Анализировать`}/>
        </Stack>
      </Card>
    </Stack>
    
  );
}