import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { CoursesObjType } from '../types/CurrenciesTypes';
import api from '../api';

interface IConverterContext {
  currency1: string;
  setCurrency1: (value: string) => void;
  currency2: string;
  setCurrency2: (value: string) => void;
  amount1: number;
  changeAmount1: (value: number) => void;
  amount2: number;
  changeAmount2: (value: number) => void;
}

export const ConverterContext = createContext<IConverterContext>({
  currency1: '',
  setCurrency1: () => console.log('error'),
  currency2: '',
  setCurrency2: () => console.log('error'),
  amount1: 0,
  changeAmount1: () => console.log('error'),
  amount2: 0,
  changeAmount2: () => console.log('error')
});

export const ConverterProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<CoursesObjType | null>(null);
  const [currency1, setCurrency1] = useState('usd');
  const [currency2, setCurrency2] = useState('uah');
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(0);
  const [isAmount1Changed, setIsAmount1Changed] = useState(true);
  const [isAmount2Changed, setIsAmount2Changed] = useState(false);

  const convertAmounts = useCallback(
    (amount: number, fromCurrency: string, toCurrency: string) => {
      if (!courses) return amount;
      const fromRate = courses[fromCurrency] ?? 1;
      const toRate = courses[toCurrency] ?? 1;
      return (amount * toRate) / fromRate;
    },
    [courses]
  );

  const changeAmount1 = useCallback((value: number) => {
    setAmount1(value);
    setIsAmount1Changed(true);
  }, []);

  const changeAmount2 = useCallback((value: number) => {
    setAmount2(value);
    setIsAmount2Changed(true);
  }, []);

  useEffect(() => {
    api.currencies
      .getCurrencyCourse(currency1)
      .then((res) => setCourses(res.data[currency1]))
      .catch((err) => console.log(err));
  }, [currency1]);

  useEffect(() => {
    if (courses && isAmount1Changed) {
      const converted = convertAmounts(amount1, currency1, currency2);
      setAmount2(+converted.toFixed(2));
      setIsAmount1Changed(false);
    }
  }, [amount1, currency1, currency2, convertAmounts, isAmount1Changed, courses]);

  useEffect(() => {
    if (courses && isAmount2Changed) {
      const converted = convertAmounts(amount2, currency2, currency1);
      setAmount1(+converted.toFixed(2));
      setIsAmount2Changed(false);
    }
  }, [amount2, currency1, currency2, convertAmounts, isAmount2Changed, courses]);

  const values = useMemo(
    () => ({
      currency1,
      setCurrency1,
      currency2,
      setCurrency2,
      amount1,
      changeAmount1,
      amount2,
      changeAmount2
    }),
    [changeAmount1, changeAmount2, currency1, currency2, amount1, amount2]
  );

  return <ConverterContext.Provider value={values}>{children}</ConverterContext.Provider>;
};

export const useConverter = () => {
  return useContext(ConverterContext);
};
