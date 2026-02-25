import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css';
import './index.css'
import App from './App.tsx'
import { MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux';
import { store } from './redux/store.ts'
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MantineProvider>
          <App />
        </MantineProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
