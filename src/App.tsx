import { CurrenciesProvider } from './contexts';
import { MainLayout } from './layouts';

function App() {
  return (
    <CurrenciesProvider>
      <MainLayout />
    </CurrenciesProvider>
  );
}

export default App;
