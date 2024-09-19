import { useEffect, useState } from 'react';
import api from '../../api';
import { CourseItem } from '../';
import { CoursesObjType } from '../../types/CurrenciesTypes';

import styles from './Header.module.scss';

export default function Header() {
  const [usdCourse, setUsdCourse] = useState<CoursesObjType>({});
  const [eurCourse, setEurCourse] = useState<CoursesObjType>({});

  useEffect(() => {
    api.currencies
      .getCurrencyCourse('usd')
      .then((res) => setUsdCourse(res.data['usd']))
      .catch((err) => console.log(err));
    api.currencies
      .getCurrencyCourse('eur')
      .then((res) => setEurCourse(res.data['eur']))
      .catch((err) => console.log(err));
  }, []);

  return (
    <header className={styles['header']}>
      <h2 className={styles['logo']}>
        <span className={styles['accent']}>Currency</span> Converter
      </h2>
      <div className={styles['courses-list']}>
        <CourseItem title="usd" value={usdCourse['uah'] ?? 0} />
        <CourseItem title="eur" value={eurCourse['uah'] ?? 0} />
      </div>
    </header>
  );
}
