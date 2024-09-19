import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { CurrenciesObjType } from '../types/CurrenciesTypes';
import api from '../api';

interface ICurrenciesContext {
  currencies: CurrenciesObjType | null;
  isLoading: boolean;
  errorMessage?: string;
  loadCurrencies: () => void;
}

export const CurrenciesContext = createContext<ICurrenciesContext>({
  currencies: null,
  isLoading: false,
  loadCurrencies: () => console.log('error')
});

export const CurrenciesProvider = ({ children }: { children: ReactNode }) => {
  const [currencies, setCurrencies] = useState<CurrenciesObjType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const loadCurrencies = useCallback(() => {
    setIsLoading(true);
    api.currencies
      .getAllcurrencies()
      .then((res) => setCurrencies(res.data))
      .catch((err) => err instanceof Error && setErrorMessage(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const values = useMemo(
    () => ({
      currencies,
      loadCurrencies,
      isLoading,
      errorMessage
    }),
    [currencies, loadCurrencies, isLoading, errorMessage]
  );

  return <CurrenciesContext.Provider value={values}>{children}</CurrenciesContext.Provider>;
};

export const useCurrencies = () => {
  return useContext(CurrenciesContext);
};
