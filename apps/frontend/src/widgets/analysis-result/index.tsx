import { Stack } from '@mantine/core';
import { IResult } from 'shared/models/IResult';
import { Result } from './Result';
import { Card } from 'shared/components/Card';
import { useState, useEffect } from 'react';
import { IType } from 'shared/models/ITypes';
import AnalysisServices from 'shared/services/AnalysisServices';

interface Props {
  result: IResult[];
  getResult: Function;
}

export const AnalysisResult = ({ result, getResult }: Props) => {
  const [group, setGroup] = useState<{ value: string; label: string }[]>([]);
  const [category, setCategory] = useState<{ value: string; label: string }[]>(
    []
  );
  const [data, setData] = useState<IType>();
  const [departments, setDepartments] = useState<
    { value: string; label: string }[]
  >([]);

  const getTypesEnum = () => {
    AnalysisServices.getTypesEnum().then((response) => {
      setData(response.data);
      setGroup(
        Object.keys(response.data).map((item) => {
          return { value: item, label: item };
        })
      );
      setCategory(Object.values(response.data).flat());
    });
  };

  const getDepartamentsEnum = () => {
    AnalysisServices.getDepartamentsEnum().then((response) => {
      setDepartments(response.data);
    });
  };

  useEffect(() => {
    getTypesEnum();
    getDepartamentsEnum();
  }, []);

  return (
    <Stack spacing={16}>
      {result.map((item, index) => (
        <Card key={item.id}>
          <Result
            ids={result.length > 1 ? result.map((item) => item.id!) : []}
            result={item}
            getResult={getResult}
            index={index}
            data={data!}
            category={category}
            group={group}
            departments={departments}
            setCategory={setCategory}
          />
        </Card>
      ))}
    </Stack>
  );
};
