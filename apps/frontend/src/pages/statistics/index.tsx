import { Button } from "shared/components/Buttons";
import AdminWrapper from "shared/components/Wrappers/AdminWrapper";

const StatisticsPage = () => {

  return (
    <AdminWrapper>
      <Button onClick={() => console.log('q213')} title="Отправить"/>
      <></>
    </AdminWrapper>
  );
}

export default StatisticsPage;