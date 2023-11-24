import { useLocation } from "react-router-dom";
import { authRoutes } from "shared/constants/routes";
import { Title } from "@mantine/core";

interface Props {
  title?: string;
}

const TitleWrapper = ({title}: Props) => {
  const location = useLocation();
  const defaultTitle = authRoutes.find(item => item.path === location.pathname)?.title!;
  
  return (
    <Title size={'h3'} color="dark.0">{title ? title : defaultTitle}</Title>
  );
};

export default TitleWrapper;