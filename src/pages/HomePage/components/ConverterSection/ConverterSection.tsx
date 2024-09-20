import { CurrencyBlock } from '../../../../components';
import { useConverter, useCurrencies } from '../../../../contexts';

import styles from './ConverterSection.module.scss';

export default function ConverterSection() {
  const { currencies } = useCurrencies();
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
