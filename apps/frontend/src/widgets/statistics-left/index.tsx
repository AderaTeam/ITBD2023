import { Stack } from '@mantine/core';
import { ThemeDiagram } from './components/ThemeDiagram';
import { GroupDiagram } from './components/GroupDiagram';

export const StatisticsLeft = () => {
  return (
    <Stack spacing={16}>
      <ThemeDiagram />
      <GroupDiagram />
    </Stack>
  );
};
