import { useCallback, useEffect, useState } from 'react';
import api from '../../../../api';
import { CurrencyBlock } from '../../../../components';
import { useCurrencies } from '../../../../contexts';
import { CoursesObjType } from '../../../../types/CurrenciesTypes';

import styles from './ConverterSection.module.scss';

export default function ConverterSection() {
  const { currencies } = useCurrencies();

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

  return (
    <section className={styles['converter-section']}>
      <h2 className={styles['title']}>Converter</h2>
      <CurrencyBlock
        title={currencies ? currencies[currency1] : 'Unknown'}
        currency={currency1}
        amount={amount1}
        onChangeCurrency={setCurrency1}
        onChangeAmount={changeAmount1}
      />
      <CurrencyBlock
        title={currencies ? currencies[currency2] : 'Unknown'}
        currency={currency2}
        amount={amount2}
        onChangeCurrency={setCurrency2}
        onChangeAmount={changeAmount2}
      />
    </section>
  );
}
