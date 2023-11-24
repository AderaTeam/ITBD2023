import { MantineProvider } from '@mantine/core';
import App from './app';
import { StrictMode, createContext } from 'react';
import * as ReactDOM from 'react-dom/client';
import UserStore from 'shared/store/UserStore';
import AnalysisStore from 'shared/store/AnalysisStore';

interface State {
  UStore: UserStore,
  AStore: AnalysisStore,
}

const UStore = new UserStore();
const AStore = new AnalysisStore();

export const Context = createContext<State>({
  UStore,
  AStore,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Context.Provider value={{UStore, AStore}}>
      <MantineProvider
        theme={{
          fontFamily: 'Manrope, sans-serif'
        }}
      >
        <App/>
      </MantineProvider>
    </Context.Provider>
  </StrictMode>
);
