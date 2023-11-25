import { Text, Stack } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { Card } from 'shared/components/Card';
import { Select } from 'shared/components/Select';

import style from './StatisticsRight.module.scss';
import { group } from 'shared/constants/group';
import { useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
  PointElement,
  LineElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.defaults.scale.grid.display = false;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const StatisticsRight = () => {
  const { control, watch } = useForm();
  const [diagramData, setDiagramData] = useState<{
    label?: string[] | undefined;
    value?: number[] | undefined;
  }>();

  const keys = Object.keys(group).map((item) => {
    return { value: item, label: item };
  });

  useEffect(() => {
    if (watch('group')) {
      const label = group[watch('group')].map((item) => item.label);
      const value = group[watch('group')].map((item) => +item.value);
      setDiagramData({ label: label, value: value });
    }
  }, [watch('group')]);

  const data = {
    labels: diagramData?.label,
    datasets: [
      {
        label: watch('group'),
        data: diagramData?.value,
        backgroundColor: '#ABE85D',
        borderColor: '#373A40',
        borderRadius: 16,
      },
    ],
  };

  return (
    <Card h={576}>
      <Stack spacing={24}>
        <Text className={style.title}>Статистика по месяцам</Text>
        <Controller
          control={control}
          name="group"
          defaultValue={'Благоустройство'}
          render={({ field }) => (
            <Select
              custom
              label="Группа тем"
              placeholder="Выберите группу тем"
              data={keys}
              field={field}
            />
          )}
        />
        <Stack h={340}>
          <Line data={data} />
        </Stack>
      </Stack>
    </Card>
  );
};
