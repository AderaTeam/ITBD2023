import { Flex, Image, Stack, Text } from '@mantine/core';
import { Card } from 'shared/components/Card';
import star from 'shared/assets/star.png';

import style from './AnalysisGuide.module.scss';

export const AnalysisGuide = () => {
  return (
    <Card p={'40px'}>
      <Flex align={'center'} justify={'space-between'}>
        <Stack spacing={8}>
          <Text className={style.title}>В чем проблема обращения?</Text>
          <Text className={style.text}>
            Введите текст заявки или загрузите документ, в котором будет
            располагаться нужная информация, и я быстро проанализирую, в чем же
            проблема
          </Text>
        </Stack>
        <Image src={star} />
      </Flex>
    </Card>
  );
};
