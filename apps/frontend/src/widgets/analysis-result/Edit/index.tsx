import { IResult } from 'shared/models/IResult';
import style from './Edir.module.scss';
import { Stack, Flex, Text } from '@mantine/core';
import { Control, Controller } from 'react-hook-form';
import { Input } from 'shared/components/Input';
import { Select } from 'shared/components/Select';

interface Props {
  result: IResult;
  control: Control<IResult, any>;
}

export const Edit = ({ result, control }: Props) => {
  return (
    <Stack spacing={18}>
      <Stack spacing={9}>
        <Text className={style.subtitle}>Текст обращения</Text>
        <Text className={style.text}>{result.text}</Text>
      </Stack>
      <Flex align={'flex-start'} justify={'space-between'}>
        <Stack w={354} spacing={9}>
          <Text className={style.subtitle}>Тема</Text>
          <Controller
            control={control}
            name="category"
            render={({ field }) => <Select field={field} data={[]} />}
          />
        </Stack>
        <Stack w={354} spacing={9}>
          <Text className={style.subtitle}>Группа тем</Text>
          <Controller
            control={control}
            name="group"
            render={({ field }) => <Select field={field} data={[]} />}
          />
        </Stack>
      </Flex>
      <Flex align={'flex-start'} justify={'space-between'}>
        <Stack w={354} spacing={9}>
          <Text className={style.subtitle}>Исполнитель</Text>
          <Controller
            control={control}
            name="department"
            render={({ field }) => <Select field={field} data={[]} />}
          />
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
          <Controller
            name="address"
            control={control}
            render={({ field }) => <Input field={field} />}
          />
        </Stack>
        <Stack w={354} spacing={9}>
          <Text className={style.subtitle}>Телефон</Text>
          <Text className={style.text}>{'Не выявлен'}</Text>
        </Stack>
      </Flex>
    </Stack>
  );
};
