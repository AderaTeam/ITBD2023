import { Button as MantineButton } from '@mantine/core';
import style from './Button.module.scss';

interface Props {
  title?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  outline?: boolean;
}

export const Button = ({
  title,
  onClick,
  color = 'grape.6',
  disabled,
  children,
  outline,
}: Props) => {
  return (
    <MantineButton
      disabled={disabled}
      color={color}
      style={
        outline
          ? {
              background: 'transparent',
              border: '2px solid #25262B',
            }
          : { background: color }
      }
      onClick={onClick}
      p={'16px 24px'}
      className={style.button}
    >
      {children ? children : title}
    </MantineButton>
  );
};
