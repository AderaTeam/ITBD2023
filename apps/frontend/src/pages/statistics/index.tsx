import { useEffect } from 'react';
import AdminWrapper from 'shared/components/Wrappers/AdminWrapper';
import { StatisticsLeft } from 'widgets/statistics-left';
import { StatisticsRight } from 'widgets/statistics-right';

const StatisticsPage = () => {
  return (
    <AdminWrapper title="Статистика обращений">
      <StatisticsLeft />
      <StatisticsRight />
    </AdminWrapper>
  );
};

export default StatisticsPage;
