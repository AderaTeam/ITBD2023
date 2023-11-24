import { Stack, Image, Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { Card } from 'shared/components/Card';

import style from './AnalysisBar.module.scss';
import bar from 'shared/assets/bar.png';
import { useContext } from 'react';
import { Context } from 'main';

export const AnalysisBar = observer(() => {
  const { AStore } = useContext(Context);

  return (
    <>
      {AStore.curentStep === 0 && (
        <Card w={796} h={301}>
          <Stack align="center" justify="center" style={{ height: '100%' }}>
            <Stack spacing={24} align="center">
              <Image src={bar} />
              <Text className={style.text}>
                Здесь будет информация по обращению
              </Text>
            </Stack>
          </Stack>
        </Card>
      )}
    </>
  );
});
