import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CurrenciesProvider, ConverterProvider } from './contexts';
import App from './App.tsx';
import './index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurrenciesProvider>
      <ConverterProvider>
        <App />
      </ConverterProvider>
    </CurrenciesProvider>
  </StrictMode>
);
