import { ConverterProvider, CurrenciesProvider } from './contexts';
import { MainLayout } from './layouts';

function App() {
  return (
    <CurrenciesProvider>
      <ConverterProvider>
        <MainLayout />
      </ConverterProvider>
    </CurrenciesProvider>
  );
}

export default App;
