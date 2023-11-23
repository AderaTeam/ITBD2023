import { MantineProvider } from '@mantine/core';
import App from './app';
import { StrictMode, createContext } from 'react';
import * as ReactDOM from 'react-dom/client';
import UserStore from 'shared/store/UserStore';

interface State {
  UStore: UserStore,
}

const UStore = new UserStore();

export const Context = createContext<State>({
  UStore,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Context.Provider value={{UStore}}>
      <MantineProvider>
        <App/>
      </MantineProvider>
    </Context.Provider>
  </StrictMode>
);
