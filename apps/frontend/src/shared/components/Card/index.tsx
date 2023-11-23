import { Stack } from "@mantine/core";
import style from './Card.module.scss';

interface Props {
  p?: string;
  spasing?: number;
  children?: React.ReactNode[]; 
}

export const Card = ({p = '32px', spasing=16, children}: Props) => {

  return (
    <Stack 
      spacing={spasing}
      bg={'dark.7'}
      className={style.card}
    >
      {children}
    </Stack>
  );
}