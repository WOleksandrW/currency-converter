import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CurrenciesProvider } from './contexts/Currencies.context.tsx';
import App from './App.tsx';
import './index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurrenciesProvider>
      <App />
    </CurrenciesProvider>
  </StrictMode>
);
