import { Flex } from '@mantine/core';
import { Checkbox } from 'shared/components/Checkbox';
import { Tag } from 'shared/components/Tag';

export const HistoryTableHeader = () => {
  return (
    <Flex gap={8}>
      <Tag text="1" p="16px" w="64px" h="64px" center>
        <Checkbox />
      </Tag>
      <Tag text="№" p="16px" w="64px" h="64px" center />
      <Tag text="Адрес" p="16px" h="64px" w="419px" />
      <Tag text="Топ тэгов на этом адресе" p="16px" w="419px" h="64px" />
      <Tag text="Дата создания" p="16px" h="64px" w="181px" />
      <Tag text="Исполнитель" p="16px" h="64px" w="419px" />
    </Flex>
  );
};
