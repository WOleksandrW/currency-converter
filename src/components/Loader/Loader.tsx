import { useMemo } from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
  size?: 'large';
}

export default function Loader({ size }: LoaderProps) {
  const classNames = useMemo(() => {
    let str = styles['loader'];
    if (size) str += ` ${styles[size]}`;
    return str;
  }, [size]);

  return <div className={classNames}></div>;
}
