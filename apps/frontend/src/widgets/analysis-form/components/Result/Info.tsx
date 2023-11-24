import { Flex, Stack, Text } from '@mantine/core';
import style from './Result.module.scss';
import { Tags } from './Tags';

export const Info = () => {
  return (
    <Stack spacing={18}>
      <Stack spacing={9}>
        <Text className={style.subtitle}>Текст обращения</Text>
        <Text className={style.text}>
          Как принять участие ?!? 💐💐💐💐💐💐💐💐💐
        </Text>
      </Stack>
      <Flex align={'center'} justify={'space-between'}>
        <Stack w={354} spacing={9}>
          <Text className={style.subtitle}>Тема</Text>
          <Text
            className={style.text}
            style={{ color: '#CC5DE8', opacity: '0.8' }}
          >
            Оказание гос. соц. помощи
          </Text>
        </Stack>
        <Stack w={354} spacing={9}>
          <Text className={style.subtitle}>Группа тем</Text>
          <Text
            style={{ color: '#CC5DE8', opacity: '0.8' }}
            className={style.text}
          >
            Социальное обслуживание и защита
          </Text>
        </Stack>
      </Flex>
      <Flex align={'center'} justify={'space-between'}>
        <Stack w={354} spacing={9}>
          <Text className={style.subtitle}>Исполнитель</Text>
          <Text className={style.text}>
            Министерство социального развития ПК
          </Text>
        </Stack>
        <Stack w={354} spacing={9}>
          <Text className={style.subtitle}>Дата</Text>
          <Text className={style.text}>Не выявлена</Text>
        </Stack>
      </Flex>
      <Flex align={'center'} justify={'space-between'}>
        <Stack w={354} spacing={9}>
          <Text className={style.subtitle}>Адрес</Text>
          <Text className={style.text}>
            Министерство социального развития ПК
          </Text>
        </Stack>
        <Stack w={354} spacing={9}>
          <Text className={style.subtitle}>Телефон</Text>
          <Text className={style.text}>Не выявлен</Text>
        </Stack>
      </Flex>
      <Tags />
    </Stack>
  );
};
