import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import api from '../../../../api';
import { CurrencyBlock, Loader } from '../../../../components';
import { CoursesObjType } from '../../../../types/CurrenciesTypes';

import styles from './ConverterSection.module.scss';

export default function ConverterSection() {
  const { currencies } = useSelector((state: RootState) => state.currenciesSlice);

  const [courses, setCourses] = useState<CoursesObjType | null>(null);
  const [currency1, setCurrency1] = useState('usd');
  const [currency2, setCurrency2] = useState('uah');
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const exchangeRate = useMemo(() => (courses ? courses[currency2] : 0), [courses, currency2]);

  useEffect(() => {
    setAmount2(+(amount1 * exchangeRate).toFixed(2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeRate]);

  const changeAmount1 = useCallback(
    (value: number) => {
      setAmount1(value);
      setAmount2(+(value * exchangeRate).toFixed(2));
    },
    [exchangeRate]
  );

  const changeAmount2 = useCallback(
    (value: number) => {
      setAmount2(value);
      setAmount1(+(value / exchangeRate).toFixed(2));
    },
    [exchangeRate]
  );

  useEffect(() => {
    setIsLoading(true);
    api.currencies
      .getCurrencyCourse(currency1)
      .then((res) => setCourses(res.data[currency1]))
      .catch((err) => err instanceof Error && setErrorMessage(err.message))
      .finally(() => setIsLoading(false));
  }, [currency1]);

  return (
    <section className={styles['converter-section']}>
      <h2 className={styles['title']}>Converter</h2>
      <div className={styles['content']}>
        <div className={styles['converter']}>
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
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          errorMessage.length > 0 && <p className={styles['error']}>{errorMessage}</p>
        )}
      </div>
    </section>
  );
}
