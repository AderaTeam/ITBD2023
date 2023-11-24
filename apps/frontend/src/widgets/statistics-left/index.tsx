import { Flex, Stack, Text } from '@mantine/core';
import { Card } from 'shared/components/Card';

import style from './StatisticsLeft.module.scss';

export const StatisticsLeft = () => {
  return (
    <Card h={419}>
      <Stack spacing={24}>
        <Text className={style.title}>Статистика по месяцам</Text>
        <Flex align={'center'} justify={'space-between'}></Flex>
      </Stack>
    </Card>
  );
};
