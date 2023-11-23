import { Flex, Stack } from "@mantine/core";
import TitleWrapper from "../TitleWrapper";

type Props = {
	children?: React.ReactNode[];
  CustomTitle?: () => JSX.Element;
};

const AdminWrapper = ({children, CustomTitle} : Props) => {
  
	return (
    <Stack bg={'dark.9'} p={'40px'} spacing={32}>
      {CustomTitle ? <CustomTitle/> : <TitleWrapper/>}
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