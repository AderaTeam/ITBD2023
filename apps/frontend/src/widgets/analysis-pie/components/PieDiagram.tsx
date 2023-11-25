import { Stack, Text } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { Select } from 'shared/components/Select';

import { theme } from 'shared/constants/theme';
import { useEffect, useState } from 'react';

import style from './PieDiagram.module.scss';

import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
  LineElement,
  PointElement,
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
        borderColor: '#373A40',
        borderRadius: 16,
      },
    ],
  };

  return (
    <Stack spacing={24}>
      <Text className={style.title}>Статистика по данной теме за год</Text>
      <Controller
        control={control}
        name="category"
        defaultValue={keys[0]}
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
      <Stack h={290}>
        <Line data={data} />
      </Stack>
    </Stack>
  );
};
