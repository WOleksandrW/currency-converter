import { ConverterSection, DiagramSection } from './components';

import styles from './HomePage.module.scss';

export default function HomePage() {
  return (
    <main className={styles['main']}>
      <ConverterSection />
      <DiagramSection />
    </main>
  );
}
