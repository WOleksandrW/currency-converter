import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { CurrenciesObjType } from '../types/CurrenciesTypes';
import api from '../api';

interface ICurrenciesContext {
  currencies: CurrenciesObjType | null;
  loadCurrencies: () => void;
}

export const CurrenciesContext = createContext<ICurrenciesContext>({
  currencies: null,
  loadCurrencies: () => console.log('error')
});

export const CurrenciesProvider = ({ children }: { children: ReactNode }) => {
  const [currencies, setCurrencies] = useState<CurrenciesObjType | null>(null);

  const loadCurrencies = useCallback(() => {
    api.currencies
      .getAllcurrencies()
      .then((res) => setCurrencies(res.data))
      .catch((err) => console.log(err));
  }, []);

  const values = useMemo(
    () => ({
      currencies,
      loadCurrencies
    }),
    [currencies, loadCurrencies]
  );

  return <CurrenciesContext.Provider value={values}>{children}</CurrenciesContext.Provider>;
};

export const useCurrencies = () => {
  return useContext(CurrenciesContext);
};
