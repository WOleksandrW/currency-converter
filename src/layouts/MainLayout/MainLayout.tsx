import { useEffect } from 'react';
import { Header, Loader } from '../../components';
import { useCurrencies } from '../../contexts';
import { HomePage } from '../../pages';

import styles from './MainLayout.module.scss';

export default function MainLayout() {
  const { currencies, loadCurrencies, isLoading, errorMessage } = useCurrencies();

  useEffect(() => {
    loadCurrencies();
  }, [loadCurrencies]);

  return currencies ? (
    <>
      <Header />
      <HomePage />
    </>
  ) : isLoading ? (
    <div className={styles['loader-block']}>
      <Loader size="large" />
    </div>
  ) : (
    <div className={styles['error-block']}>
      <h2 className={styles['error-title']}>Error</h2>
      <p className={styles['error-text']}>
        {errorMessage ?? 'The list of currencies is not loading'}
      </p>
    </div>
  );
}
