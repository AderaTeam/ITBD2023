import { Stack, Flex, Text } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { Edit } from '../Edit';
import { Info } from './Info';
import { useEffect, useState } from 'react';
import { IResult } from 'shared/models/IResult';

import style from './Result.module.scss';
import { Tags } from './Tags';
import { Button } from 'shared/components/Buttons';
import { useForm } from 'react-hook-form';
import AnalysisServices from 'shared/services/AnalysisServices';
import { IType } from 'shared/models/ITypes';

interface Props {
  result: IResult;
  index: number;
  getResult: Function;
}

export const Result = ({ result, index, getResult }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: result,
  });
  const [group, setGroup] = useState<{ value: string; label: string }[]>([]);
  const [category, setCategory] = useState<{ value: string; label: string }[]>(
    []
  );
  const [data, setData] = useState<IType>();
  const [departments, setDepartments] = useState<
    { value: string; label: string }[]
  >([]);

  const onSubmit = handleSubmit((formData) => {
    AnalysisServices.upadateAnalysis(formData).then(() => {
      getResult(result.id, true);
    });
  });

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

  useEffect(() => {
    if (data && watch('group')) {
      setValue('category', '');
      console.log(data[watch('group')]);
      setCategory(data[watch('group')]);
    }
  }, [watch('group')]);

  return (
    <Stack spacing={32}>
      <Flex align={'center'} justify={'space-between'}>
        <Text className={style.title}>
          Результат анализа обращения{' '}
          <span className={style.index}>({index + 1})</span>
        </Text>
        <IconEdit
          onClick={() => setIsEdit(!isEdit)}
          style={{ cursor: 'pointer' }}
          color="#C1C2C5"
          width={24}
          height={24}
          stroke={2}
        />
      </Flex>
      {!isEdit ? (
        <Info result={result} />
      ) : (
        <Edit
          departments={departments}
          control={control}
          category={category}
          group={group}
          result={result}
        />
      )}

      <Tags tags={result?.tags} />
      {isEdit && (
        <Button onClick={onSubmit} outline title="Сохранить результат" />
      )}
    </Stack>
  );
};
