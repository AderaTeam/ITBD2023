import { Flex, Loader, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AdminWrapper from 'shared/components/Wrappers/AdminWrapper';
import { IResult } from 'shared/models/IResult';
import HistoryServices from 'shared/services/HistoryServices';
import { HistoryButtonRow } from 'widgets/history-button-row';
import { HistoryTable } from 'widgets/history-table';

const HistoryPage = () => {
  const [result, setResult] = useState<IResult[]>([]);
  const { control, setValue, getValues } = useForm();

  useEffect(() => {
    HistoryServices.getHistory().then((response) => setResult(response.data));
  }, []);

  return (
    <AdminWrapper fullWidth>
      <Stack spacing={16} w={1607}>
        <HistoryButtonRow result={result} getValues={getValues} />
        {result.length ? (
          <HistoryTable control={control} setValue={setValue} result={result} />
        ) : (
          <Flex justify={'center'} mt={300} align={'center'}>
            <Loader size={'xl'} color="grape.5" />
          </Flex>
        )}
      </Stack>
      <></>
    </AdminWrapper>
  );
};

export default HistoryPage;
