import { Stack, Image, Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { Card } from 'shared/components/Card';

import style from './AnalysisPie.module.scss';
import pie from 'shared/assets/pie.png';
import stat from 'shared/assets/stat.png';
import { useContext } from 'react';
import { Context } from 'main';

export const AnalysisPie = observer(() => {
  const { AStore } = useContext(Context);

  return (
    <Card w={796} h={443}>
      {AStore.curentStep === 0 && (
        <Stack align="center" justify="center" style={{ height: '100%' }}>
          <Stack spacing={24} align="center">
            <Image src={pie} />
            <Text className={style.text}>
              Здесь будет информация по обращению
            </Text>
            <Image src={stat} />
          </Stack>
        </Stack>
      )}
    </Card>
  );
});
