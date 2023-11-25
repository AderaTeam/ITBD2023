import { Text, Stack } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { Card } from 'shared/components/Card';
import { Select } from 'shared/components/Select';

import style from './ThemeDiagram.module.scss';
import { theme } from 'shared/constants/theme';
import { useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.defaults.scale.grid.display = false;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ThemeDiagram = () => {
  const { control, watch } = useForm();
  const [diagramData, setDiagramData] = useState<{
    label?: string[] | undefined;
    value?: number[] | undefined;
  }>();

  const keys = Object.keys(theme).map((item) => {
    return { value: item, label: item };
  });

  useEffect(() => {
    if (watch('category')) {
      const label = theme[watch('category')].map((item) => item.label);
      const value = theme[watch('category')].map((item) => +item.value);
      setDiagramData({ label: label, value: value });
    }
  }, [watch('category')]);

  const data = {
    labels: diagramData?.label,
    datasets: [
      {
        label: watch('category'),
        data: diagramData?.value,
        backgroundColor: '#CC5DE8',
        borderRadius: 16,
      },
    ],
  };

  return (
    <Card h={519}>
      <Stack spacing={24}>
        <Text className={style.title}>Статистика по месяцам</Text>
        <Controller
          control={control}
          name="category"
          defaultValue={'Диспансеризация'}
          render={({ field }) => (
            <Select
              custom
              label="Тема"
              placeholder="Выберите тему"
              data={keys}
              field={field}
            />
          )}
        />
        <Stack h={290}>
          <Bar data={data} />
        </Stack>
      </Stack>
    </Card>
  );
};
