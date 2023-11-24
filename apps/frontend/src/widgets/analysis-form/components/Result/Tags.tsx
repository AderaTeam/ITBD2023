import { Flex } from '@mantine/core';
import { Tag } from 'shared/components/Tag';

export const Tags = () => {
  return (
    <Flex gap={8} align={'center'}>
      {['sasd'].map((item) => (
        <Tag text={item} />
      ))}
    </Flex>
  );
};
