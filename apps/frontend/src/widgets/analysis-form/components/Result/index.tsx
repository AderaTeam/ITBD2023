import { Flex, Stack, Text } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';

import style from './Result.module.scss';
import { Info } from './Info';
import { useState } from 'react';

export const Result = () => {
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
      {!isEdit ? <Info /> : <></>}
    </Stack>
  );
};
