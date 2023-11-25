import { Stack } from '@mantine/core';
import style from './Card.module.scss';

interface Props {
  p?: string;
  spasing?: number;
  children?: React.ReactNode;
  w?: number;
  h?: number | string;
}

export const Card = ({ p = '32px', spasing = 16, children, w, h }: Props) => {
  return (
    <Stack
      p={p}
      spacing={spasing}
      bg={'dark.7'}
      w={w}
      h={h}
      className={style.card}
    >
      {children}
    </Stack>
  );
};
