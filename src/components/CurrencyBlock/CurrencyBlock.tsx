import { CurrencySelect } from '../';

import styles from './CurrencyBlock.module.scss';

interface CurrencyBlockProps {
  title: string;
  currency: string;
  amount: number;
  onChangeCurrency: (value: string) => void;
  onChangeAmount: (value: number) => void;
}

export default function CurrencyBlock({
  title,
  currency,
  amount,
  onChangeCurrency,
  onChangeAmount
}: CurrencyBlockProps) {
  return (
    <div className={styles['currency-block']}>
      <h3 className={styles['title']}>
        Currency: <span className={styles['code']}>({currency})</span> {title}
      </h3>
      <div className={styles['fields']}>
        <input
          className={styles['input']}
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => onChangeAmount(+e.target.value)}
        />
        <CurrencySelect activeKey={currency} onChange={(value) => onChangeCurrency(value)} />
      </div>
    </div>
  );
}
