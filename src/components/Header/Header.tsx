import { CourseItem } from '../';

import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles['header']}>
      <h2 className={styles['logo']}>
        <span className={styles['accent']}>Currency</span> Converter
      </h2>
      <div className={styles['courses-list']}>
        <CourseItem title="usd" value={45.3124512} />
        <CourseItem title="eur" value={43.34564} />
      </div>
    </header>
  );
}
