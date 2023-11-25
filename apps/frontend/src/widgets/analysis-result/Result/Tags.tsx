import { Flex } from '@mantine/core';
import { Tag } from 'shared/components/Tag';

interface Props {
  tags?: { id: number; name: string }[];
}

export const Tags = ({ tags }: Props) => {
  return (
    <Flex gap={8} align={'center'}>
      {tags && tags?.map((item) => <Tag key={item.id} text={item.name} />)}
    </Flex>
  );
};
