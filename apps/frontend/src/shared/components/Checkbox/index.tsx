import { Checkbox as MantineCheckbox } from '@mantine/core';
import style from './Checkbox.module.scss';

export const Checkbox = () => {
  return <MantineCheckbox color="grape.5" className={style.checkbox} />;
};
