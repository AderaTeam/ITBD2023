import { Stack, Text } from '@mantine/core';
import { Card } from 'shared/components/Card';

import style from './StatisticsRight.module.scss';

export const StatisticsRight = () => {
  return (
    <Card h={796}>
      <Stack spacing={24}>
        <Text className={style.title}>Статистика по количеству обращений</Text>
      </Stack>
    </Card>
  );
};
