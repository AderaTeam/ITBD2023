import { Text, Stack } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { Card } from 'shared/components/Card';
import { Select } from 'shared/components/Select';

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

interface Props {
  keys: string[];
}

export const PieDiagram = ({ keys }: Props) => {
  const { control, watch } = useForm();
  const [diagramData, setDiagramData] = useState<{
    label?: string[] | undefined;
    value?: number[] | undefined;
  }>();

  const array = keys.map((item) => {
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
    <Stack spacing={24}>
      <Controller
        control={control}
        name="category"
        defaultValue={'Диспансеризация'}
        render={({ field }) => (
          <Select
            custom
            label="Тема"
            placeholder="Выберите тему"
            data={array}
            field={field}
          />
        )}
      />
      <Stack h={250}>
        <Bar data={data} />
      </Stack>
    </Stack>
  );
};
