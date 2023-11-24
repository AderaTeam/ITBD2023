import { Flex } from '@mantine/core';
import { Checkbox } from 'shared/components/Checkbox';
import { Tag } from 'shared/components/Tag';
import { IHistory } from 'shared/models/IHistory';
import { Tags } from 'widgets/analysis-result/Result/Tags';

interface Props {
  index: number;
  item: IHistory;
}

export const HistoryItem = ({ index, item }: Props) => {
  return (
    <Flex gap={8}>
      <Tag color="#1A1B1E" text="1" p="16px" w="64px" h="68px" center>
        <Checkbox />
      </Tag>
      <Tag
        color="#1A1B1E"
        text={`${index + 1}`}
        p="16px"
        w="64px"
        h="68px"
        center
      />
      <Tag
        color="#1A1B1E"
        text={`${item?.address}`}
        p="16px"
        h="68px"
        w="419px"
      />
      <Tag color="#1A1B1E" p="16px" w="419px" text="1" h="68px">
        <Tags tags={item?.tags} />
      </Tag>
      <Tag
        color="#1A1B1E"
        text={`${item?.date ? item.date : 'Не выявлено'}`}
        p="16px"
        h="68px"
        w="181px"
      />
      <Tag
        color="#1A1B1E"
        text={`${item?.department}`}
        p="16px"
        h="68px"
        w="419px"
      />
    </Flex>
  );
};
