import { Flex, Stack } from "@mantine/core";
import TitleWrapper from "../TitleWrapper";
import { useLocation } from "react-router";
import { AnalysisSteps } from "widgets/analysis-steps";

type Props = {
	children?: React.ReactNode[];
  CustomTitle?: () => JSX.Element;
  title?: string; 
};

const AdminWrapper = ({children, CustomTitle, title} : Props) => {
  const location = useLocation();
  
	return (
    <Stack bg={'dark.9'} p={'40px'} spacing={32}>
      {CustomTitle ? <CustomTitle/> : <TitleWrapper title={title}/>}
      {location.pathname === '/analysis' && <AnalysisSteps/>}
      <Flex justify="space-between" gap={16}>
        <Stack w={955}>
          {children ? children[0] : <></>}
        </Stack>
        <Stack w={629}>
          {children ? children[1] : <></>}
        </Stack>
      </Flex>
    </Stack>
	);
};

export default AdminWrapper;