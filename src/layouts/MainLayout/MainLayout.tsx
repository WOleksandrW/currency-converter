import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchCurrencies } from '../../redux/currenciesSlice';
import { Header, Loader } from '../../components';
import { HomePage } from '../../pages';

import styles from './MainLayout.module.scss';

export default function MainLayout() {
  const { currencies, isLoading, errorMessage } = useSelector((state: RootState) => state.currenciesSlice);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

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
      <h2 className="h1">Error</h2>
      <p className="p1">
        {errorMessage ?? 'The list of currencies is not loading'}
      </p>
    </div>
  );
}
