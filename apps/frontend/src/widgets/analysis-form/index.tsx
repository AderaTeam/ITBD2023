import { Stack } from '@mantine/core';
import { Card } from 'shared/components/Card';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from 'main';
import { Form } from './components/Form';

export const AnalysisForm = observer(() => {
  const { AStore } = useContext(Context);

  return (
    <Stack spacing={32}>
      <Card w={796}>{AStore.curentStep === 0 ? <Form /> : <></>}</Card>
    </Stack>
  );
});
