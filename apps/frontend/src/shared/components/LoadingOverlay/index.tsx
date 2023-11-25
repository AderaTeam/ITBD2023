import { Loader, LoadingOverlay as MantineLoadingOverlay } from '@mantine/core';

interface Props {
  isLoading?: boolean;
}

export const LoadingOverlay = ({ isLoading }: Props) => {
  return (
    <MantineLoadingOverlay
      visible={isLoading || false}
      loader={<Loader color="grape.5" size={'xl'} />}
      overlayBlur={0.6}
      overlayColor="#373A40"
      style={{ borderRadius: '24px' }}
    />
  );
};
