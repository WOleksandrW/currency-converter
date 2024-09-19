import { RefObject, useCallback } from 'react';
import { useCurrencies } from '../../contexts';
import useComponentVisible from '../../hooks/useComponentVisible';

import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import styles from './CurrencySelect.module.scss';

interface CurrencySelectProps {
  activeKey: string;
  onChange: (value: string) => void;
}

export default function CurrencySelect({ activeKey, onChange }: CurrencySelectProps) {
  const { currencies } = useCurrencies();
  const { ref, isVisible, setIsVisible } = useComponentVisible(false);

  const onClickHandle = useCallback(
    (value: string) => {
      onChange(value);
      setIsVisible(false);
    },
    [onChange, setIsVisible]
  );

  return (
    <div className={styles['select']} ref={ref as RefObject<HTMLDivElement>}>
      <div className={styles['display']} onClick={() => setIsVisible((prev) => !prev)}>
        {activeKey ? (
          <>
            <span className={styles['key']}>({activeKey})</span>{' '}
            {currencies && currencies[activeKey]}
          </>
        ) : (
          'Select'
        )}
        {!isVisible ? <FaChevronDown /> : <FaChevronUp />}
      </div>
      <ul className={styles['list']}>
        {isVisible &&
          currencies &&
          Object.entries(currencies).map(([key, label]) => (
            <li className={styles['option']} key={key} onClick={() => onClickHandle(key)}>
              <span className={styles['key']}>({key})</span> {label}
            </li>
          ))}
      </ul>
    </div>
  );
}
