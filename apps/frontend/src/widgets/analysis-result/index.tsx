import { Stack } from '@mantine/core';
import { IResult } from 'shared/models/IResult';
import { Result } from './Result';
import { Card } from 'shared/components/Card';

interface Props {
  result: IResult[];
  getResult: Function;
}

export const AnalysisResult = ({ result, getResult }: Props) => {
  return (
    <Stack spacing={16}>
      {result.map((item, index) => (
        <Card key={item.id}>
          <Result result={item} getResult={getResult} index={index} />
        </Card>
      ))}
    </Stack>
  );
};
