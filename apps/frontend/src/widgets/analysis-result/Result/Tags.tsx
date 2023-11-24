import { Flex } from '@mantine/core';
import { Tag } from 'shared/components/Tag';

interface Props {
  tags?: string[];
}

export const Tags = ({ tags }: Props) => {
  return (
    <Flex gap={8} align={'center'}>
      {tags?.map((item) => (
        <Tag key={item} text={item} />
      ))}
    </Flex>
  );
};
