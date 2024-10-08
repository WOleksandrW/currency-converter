import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import useComponentVisible from '../../hooks/useComponentVisible';

import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import styles from './CurrencySelect.module.scss';

interface CurrencySelectProps {
  activeKey: string;
  onChange: (value: string) => void;
}

export default function CurrencySelect({ activeKey, onChange }: CurrencySelectProps) {
  const { currencies } = useSelector((state: RootState) => state.currenciesSlice);
  const { ref, isVisible, setIsVisible } = useComponentVisible(false);

  const [search, setSearch] = useState('');

  const displayList = useMemo(() => {
    return Object.entries(currencies ?? {}).filter(([key, label]) => {
      const value = search.toLowerCase();
      return key.includes(value) || label.toLowerCase().includes(value);
    });
  }, [currencies, search]);

  const onClickHandle = useCallback(
    (value: string) => {
      onChange(value);
      setIsVisible(false);
    },
    [onChange, setIsVisible]
  );

  useEffect(() => {
    if (!isVisible) setSearch('');
  }, [isVisible]);

  return (
    <div className={styles['select']} ref={ref as RefObject<HTMLDivElement>}>
      <div className={`p3 ${styles['display']}`} onClick={() => setIsVisible((prev) => !prev)}>
        {!isVisible ? (
          activeKey ? (
            <p className={styles['text']}>
              <span className="curr-code">({activeKey})</span>{' '}
              {currencies && currencies[activeKey]}
            </p>
          ) : (
            'Select'
          )
        ) : (
          <input
            className={styles['search-bar']}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            type="text"
            placeholder="Search..."
            autoFocus
          />
        )}
        {!isVisible ? <FaChevronDown /> : <FaChevronUp />}
      </div>
      {isVisible && (
        <ul className={styles['list']}>
          {displayList.length > 0 ? (
            displayList.map(([key, label]) => (
              <li className={`p3 ${styles['option']}`} key={key} onClick={() => onClickHandle(key)}>
                <span className="curr-code">({key})</span> {label}
              </li>
            ))
          ) : (
            <li className={`p3 ${styles['empty-message']}`}>List is empty</li>
          )}
        </ul>
      )}
    </div>
  );
}
