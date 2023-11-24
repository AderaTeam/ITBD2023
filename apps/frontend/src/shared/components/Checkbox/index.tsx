import { Checkbox as MantineCheckbox } from '@mantine/core';
import style from './Checkbox.module.scss';

interface Props {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox = ({ onChange }: Props) => {
  return (
    <MantineCheckbox
      onChange={onChange}
      color="grape.5"
      className={style.checkbox}
    />
  );
};
