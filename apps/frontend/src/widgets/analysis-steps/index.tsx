import { Divider, Flex } from '@mantine/core';
import { Context } from 'main';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { StepCard } from './components/StepCard';

export const AnalysisSteps = observer(() => {
  const { AStore } = useContext(Context);
  const blocks = [
    {
      title: 'Укажите обращения',
      description: '(вводом или загрузкой)',
    },
    {
      title: 'Просмотрите и измените',
      description: '(если результат оказался неточным)',
    },
    {
      title: 'Сохраните',
      description: '(для просмотра в истории)',
    },
  ];

  return (
    <Flex gap={26} align={'center'}>
      {blocks.map((block, index) => {
        if (index === 1) {
          return (
            <Flex align={'center'} gap={24}>
              <Divider
                color={AStore.curentStep > 0 ? 'grape.5' : 'dark.6'}
                w={387}
                h={1}
              />
              <StepCard index={index} block={block} step={AStore.curentStep} />
              <Divider
                color={AStore.curentStep > 1 ? 'grape.5' : 'dark.6'}
                w={387}
                h={1}
              />
            </Flex>
          );
        } else {
          return (
            <StepCard index={index} block={block} step={AStore.curentStep} />
          );
        }
      })}
    </Flex>
  );
});
