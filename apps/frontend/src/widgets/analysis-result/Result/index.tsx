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
  ids: number[];
  departments: { value: string; label: string }[];
  group: { value: string; label: string }[];
  category: { value: string; label: string }[];
  data: IType;
  setCategory: React.Dispatch<
    React.SetStateAction<
      {
        value: string;
        label: string;
      }[]
    >
  >;
}

export const Result = ({
  result,
  index,
  getResult,
  ids,
  group,
  category,
  departments,
  data,
  setCategory,
}: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: result,
  });

  const onSubmit = handleSubmit((formData) => {
    AnalysisServices.upadateAnalysis(formData).then(() => {
      if (ids.length) {
        getResult(undefined, true, ids);
      } else {
        getResult(result.id, true);
      }
    });
  });

  useEffect(() => {
    if (data && watch('group')) {
      setValue('category', '');
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
