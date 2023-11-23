import { Stack, Text } from "@mantine/core";
import style from './StepCard.module.scss';

interface Props {
  block: {title: string, description: string},
  step: number,
  index: number,
}

export const StepCard = ({block, step, index}: Props) => {
  return (
    <Stack 
      style={index <= step ? {border: '1px solid #CC5DE8' } : {}} 
      className={style.card} spacing={2} 
      p={'16px 24px'}
    >
      <Text style={index === step ? {color: '#CC5DE8'} : {}} className={style.title}>{block.title}</Text>
      <Text className={style.text}>{block.description}</Text>
    </Stack>
  );
}