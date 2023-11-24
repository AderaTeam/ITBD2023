import { Flex } from '@mantine/core';
import { Button } from 'shared/components/Buttons';

import style from './HistoryButtonRow.module.scss';
import { IconExternalLink } from '@tabler/icons-react';

export const HistoryButtonRow = () => {
  return (
    <Flex align={'center'} justify={'space-between'}>
      <Flex gap={16}>
        <Button outline>
          Смотреть на карте{' '}
          <IconExternalLink
            style={{ marginLeft: '8px' }}
            stroke={2}
            color="#2C2E33"
          />
        </Button>
        <Button>
          Экспорт отчета{' '}
          <span className={style['button-text']}>&nbsp; .xlsx</span>
        </Button>
      </Flex>
    </Flex>
  );
};
