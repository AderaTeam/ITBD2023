import { Flex } from '@mantine/core';
import { Button } from 'shared/components/Buttons';
import FileDownload from 'js-file-download';

import style from './HistoryButtonRow.module.scss';
import { IconExternalLink } from '@tabler/icons-react';
import {
  UseFormGetValues,
  FieldValues,
  Controller,
  useForm,
  UseFormWatch,
} from 'react-hook-form';
import { IResult } from 'shared/models/IResult';
import { useNavigate } from 'react-router';
import { MAP_ROUTE } from 'shared/constants/const';
import { Input } from 'shared/components/Input';
import HistoryServices from 'shared/services/HistoryServices';

interface Props {
  result: IResult[];
  getValues: UseFormGetValues<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

export const HistoryButtonRow = ({ getValues, result, watch }: Props) => {
  const navigate = useNavigate();
  const { control } = useForm();
  const len = watch('analysis') || [];

  const handleMapLinkClick = () => {
    if (getValues('analysis')) {
      const ids = getValues('analysis').map((item: string) => +item);
      navigate(MAP_ROUTE, {
        state: { result: result.filter((item) => +ids.includes(item.id)) },
      });
    }
  };

  const handleGetFile = async () => {
    const response = await HistoryServices.getFile(getValues('analysis'));
    FileDownload(response.data, 'document.xlsx');
  };

  return (
    <Flex align={'flex-start'} justify={'space-between'}>
      <Flex gap={16}>
        <Button outline onClick={handleMapLinkClick} disabled={!len.length}>
          Смотреть на карте{' '}
          <IconExternalLink
            style={{ marginLeft: '8px' }}
            stroke={2}
            color="#2C2E33"
          />
        </Button>
        <Button onClick={handleGetFile} disabled={!len.length}>
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
