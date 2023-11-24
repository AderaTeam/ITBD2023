import { Flex, Stack } from "@mantine/core";
import { Context } from "main";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ANALYSIS_ROUTE, STATISTICS_ROUTE } from "shared/constants/const";
import { authRoutes, publicRoutes } from "shared/constants/routes";
import NavbarNested from "widgets/navbar/Navbar";

export const Routing = observer(() => {
  const { UStore } = useContext(Context);

  if (!UStore.isAuth && (location.pathname === '/' || location.pathname === ANALYSIS_ROUTE || 
  location.pathname === STATISTICS_ROUTE)) {
    return <Navigate to='/login' replace/>
  }

  if (UStore.isAuth && (location.pathname === '/login' || location.pathname === '/registration')) {
    return <Navigate to={STATISTICS_ROUTE} replace/>
  }

  if (location.pathname === '/') {
    return <Navigate to={ANALYSIS_ROUTE}/>
  }

  return (
    <Flex className="wrapper" bg={'dark.9'} style={{height: '100vh'}}>
      <Flex>
        {(UStore.isAuth && (location.pathname !== '/login' && location.pathname !== '/registration')) 
        ? <NavbarNested/> : <></>}
        <Stack spacing={40}>
          <Routes>
            {UStore.isAuth && authRoutes.map(({path, Component}) => 
              <Route key={path} path={path} element={<Component/>}/>
            )}
            {publicRoutes.map(({path, Component}) => 
              <Route key={path} path={path} element={<Component/>}/>
            )}
          </Routes>
        </Stack>
      </Flex>
    </Flex>
  );
});
