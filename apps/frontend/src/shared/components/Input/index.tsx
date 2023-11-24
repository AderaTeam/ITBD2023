import { Input as MantineInput } from '@mantine/core';
import style from './Input.module.scss';
import { ControllerRenderProps } from 'react-hook-form';
import { IResult } from 'shared/models/IResult';

interface Props {
  field: ControllerRenderProps<IResult, any>;
}

export const Input = ({ field }: Props) => {
  return <MantineInput {...field} className={style.input} />;
};
