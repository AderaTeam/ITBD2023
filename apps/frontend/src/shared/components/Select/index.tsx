import { Select as MantineSelect } from '@mantine/core';
import style from './Select.module.scss';
import { ControllerRenderProps } from 'react-hook-form';
import { IResult } from 'shared/models/IResult';

interface Props {
  data: { label: string; value: string }[];
  field: ControllerRenderProps<IResult, any>;
}

export const Select = ({ data, field }: Props) => {
  return (
    <MantineSelect
      {...field}
      data={data}
      className={style.select}
      searchable
      creatable
      getCreateLabel={(query) => `+ Create ${query}`}
    />
  );
};
