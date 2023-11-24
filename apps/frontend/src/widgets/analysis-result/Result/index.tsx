import { Stack, Flex, Text } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { Edit } from '../Edit';
import { Info } from './Info';
import { useState } from 'react';
import { IResult } from 'shared/models/IResult';

import style from './Result.module.scss';

interface Props {
  result: IResult;
  index: number;
}

export const Result = ({ result, index }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

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
      {!isEdit ? <Info result={result} /> : <Edit result={result} />}
    </Stack>
  );
};
