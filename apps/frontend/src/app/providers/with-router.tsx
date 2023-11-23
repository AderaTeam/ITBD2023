import { Loader, Stack } from "@mantine/core";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

export const withRouter = (component: () => React.ReactNode) => () => (
  <BrowserRouter>
    <Suspense fallback={
      <Stack h={"100vh"} align="center" justify="center">
        <Loader size="xl" color="indigo.5"/>
      </Stack>
    }
    >
      {component()}
    </Suspense>
  </BrowserRouter>
);
