import { useLocation } from "react-router-dom";
import { authRoutes } from "shared/constants/routes";
import { Title } from "@mantine/core";

const TitleWrapper = () => {
  const location = useLocation();
  const title = authRoutes.find(item => item.path === location.pathname)?.title!;
  
  return (
    <Title size={'h3'} color="dark.0">{title ? title : ''}</Title>
  );
};

export default TitleWrapper;