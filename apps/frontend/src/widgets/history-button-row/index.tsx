import { Flex } from '@mantine/core';
import { Button } from 'shared/components/Buttons';

import style from './HistoryButtonRow.module.scss';
import { IconExternalLink } from '@tabler/icons-react';
import {
  UseFormGetValues,
  FieldValues,
  Controller,
  useForm,
} from 'react-hook-form';
import { IResult } from 'shared/models/IResult';
import { useNavigate } from 'react-router';
import { MAP_ROUTE } from 'shared/constants/const';
import { Input } from 'shared/components/Input';

interface Props {
  result: IResult[];
  getValues: UseFormGetValues<FieldValues>;
}

export const HistoryButtonRow = ({ getValues, result }: Props) => {
  const navigate = useNavigate();
  const { control } = useForm();

  const handleMapLinkClick = () => {
    if (getValues('analysis')) {
      const ids = getValues('analysis').map((item: string) => +item);
      navigate(MAP_ROUTE, {
        state: { result: result.filter((item) => +ids.includes(item.id)) },
      });
    }
  };

  return (
    <Flex align={'flex-start'} justify={'space-between'}>
      <Flex gap={16}>
        <Button outline onClick={handleMapLinkClick}>
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
      <Controller
        name="search"
        control={control}
        disabled
        render={({ field }) => (
          <Input
            w={430}
            h={56}
            size={'lg'}
            br={'16px'}
            placeholder="Поиск по столбцам"
            field={field}
          />
        )}
      />
    </Flex>
  );
};
