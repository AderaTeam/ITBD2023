import { Flex, Stack } from '@mantine/core';
import TitleWrapper from '../TitleWrapper';
import { useLocation } from 'react-router';
import { AnalysisSteps } from 'widgets/analysis-steps';

type Props = {
  children?: React.ReactNode[];
  CustomTitle?: () => JSX.Element;
  title?: string;
  fullWidth?: boolean;
};

const AdminWrapper = ({ children, CustomTitle, title, fullWidth }: Props) => {
  const location = useLocation();

  return (
    <Stack bg={'dark.9'} p={'40px 32px'} spacing={32}>
      {CustomTitle ? <CustomTitle /> : <TitleWrapper title={title} />}
      {location.pathname.includes('/analysis') && <AnalysisSteps />}
      <Flex justify="space-between" gap={16}>
        {!fullWidth ? (
          <>
            <Stack w={796}>{children ? children[0] : <></>}</Stack>
            <Stack w={795}>{children ? children[1] : <></>}</Stack>
          </>
        ) : (
          <Stack spacing={0}>{children ? children[0] : <></>}</Stack>
        )}
      </Flex>
    </Stack>
  );
};

export default AdminWrapper;
