import { Flex, Stack, Text } from '@mantine/core';
import style from './Result.module.scss';
import { IResult } from 'shared/models/IResult';

interface Props {
  result: IResult;
}

export const Info = ({ result }: Props) => {
  return (
    <Stack spacing={18}>
      <Stack spacing={9}>
        <Text className={style.subtitle}>Текст обращения</Text>
        <Text className={style.text}>{result.text}</Text>
      </Stack>
      <Flex align={'flex-start'} justify={'space-between'}>
        <Stack w={354} spacing={9}>
          <Text className={style.subtitle}>Тема</Text>
          <Text
            className={style.text}
            style={{ color: '#CC5DE8', opacity: '0.8' }}
          >
            {result.category}
          </Text>
        </Stack>
        <Stack w={354} spacing={9}>
          <Text className={style.subtitle}>Группа тем</Text>
          <Text
            style={{ color: '#CC5DE8', opacity: '0.8' }}
            className={style.text}
          >
            {result.group}
          </Text>
        </Stack>
      </Flex>
      <Flex align={'flex-start'} justify={'space-between'}>
        <Stack w={354} spacing={9}>
          <Text className={style.subtitle}>Исполнитель</Text>
          <Text className={style.text}>
            {result.department ? result.department : 'Не выявлен'}
          </Text>
        </Stack>
        <Stack w={354} spacing={9}>
          <Text className={style.subtitle}>Дата</Text>
          <Text className={style.text}>
            {result.date ? result.date : 'Не выявлена'}
          </Text>
        </Stack>
      </Flex>
      <Flex align={'flex-start'} justify={'space-between'}>
        <Stack w={354} spacing={9}>
          <Text className={style.subtitle}>Адрес</Text>
          <Text className={style.text}>
            {result.address ? result.address : 'Не выявлен'}
          </Text>
        </Stack>
        <Stack w={354} spacing={9}>
          <Text className={style.subtitle}>Телефон</Text>
          <Text className={style.text}>{'Не выявлен'}</Text>
        </Stack>
      </Flex>
    </Stack>
  );
};
