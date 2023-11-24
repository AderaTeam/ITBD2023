import { Flex, Stack, Text } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';

import style from './Result.module.scss';
import { Info } from './Info';
import { useState } from 'react';
import { IResult } from 'shared/models/IResult';

interface Props {
  result: IResult[];
}

export const Result = ({ result }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <Stack spacing={32}>
      <Flex align={'center'} justify={'space-between'}>
        <Text className={style.title}>Результат анализа обращения</Text>
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
        <Stack spacing={16}>
          {result.map((item, index) => (
            <Info key={item.id} index={index} result={item} />
          ))}
        </Stack>
      ) : (
        <></>
      )}
    </Stack>
  );
};
