import { useEffect } from 'react';
import { useConverter, useCurrencies } from './contexts';
import { CurrencyBlock, Header, Loader } from './components';

import styles from './App.module.scss';

function App() {
  const { currencies, loadCurrencies, isLoading } = useCurrencies();
  const {
    currency1,
    setCurrency1,
    amount1,
    changeAmount1,
    currency2,
    setCurrency2,
    amount2,
    changeAmount2
  } = useConverter();

  useEffect(() => {
    loadCurrencies();
  }, [loadCurrencies]);

  return currencies ? (
    <>
      <Header />
      <main className={styles['main']}>
        <section className={styles['section-1']}>
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
        <section className={styles['section-2']}>
          <h2 className={styles['title']}>Graphics</h2>
          <p className={styles['message']}>In progress...</p>
        </section>
      </main>
    </>
  ) : isLoading ? (
    <div className={styles['loader-block']}>
      <Loader size="large" />
    </div>
  ) : (
    <h1>Error</h1>
  );
}

export default App;
