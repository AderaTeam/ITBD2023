import { Button as MantineButton} from '@mantine/core';
import style from './Button.module.scss';

interface Props {
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: string
}

export const Button = ({title, onClick, color="grape.6"}: Props) => {

  return (
    <MantineButton
      color={color}
      onClick={onClick}
      p={'16px 24px'}
      className={style.button}
    >
        {title}
    </MantineButton>
  )
}