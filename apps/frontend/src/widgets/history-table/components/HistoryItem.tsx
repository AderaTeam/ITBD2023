import { Flex } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { Checkbox } from 'shared/components/Checkbox';
import { Tag } from 'shared/components/Tag';
import { ANALYSIS_ROUTE } from 'shared/constants/const';
import { IResult } from 'shared/models/IResult';
import { Tags } from 'widgets/analysis-result/Result/Tags';

interface Props {
  index: number;
  item: IResult;
}

export const HistoryItem = ({ index, item }: Props) => {
  const navigate = useNavigate();

  return (
    <Flex gap={8}>
      <Tag color="#1A1B1E" text="1" p="16px" w="64px" h="68px" center>
        <Checkbox value={`${item.id}`} />
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
        onClick={() => navigate(ANALYSIS_ROUTE + `/${item.id}`)}
      >
        <Flex
          style={{ width: '100%' }}
          align={'center'}
          justify={'space-between'}
        >
          <div>{item?.address || 'Не выявлен'}</div>
          <IconChevronRight width={24} height={24} />
        </Flex>
      </Tag>
      <Tag color="#1A1B1E" p="16px" w="419px" text="1" h="68px">
        {item.tags?.length ? <Tags tags={item?.tags} /> : 'Не выявлены'}
      </Tag>
      <Tag
        color="#1A1B1E"
        text={`${item?.date ? item.date : 'Не выявлена'}`}
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
