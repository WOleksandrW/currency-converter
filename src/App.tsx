import { Header } from './components';

import styles from './App.module.scss';

function App() {
  return (
    <>
      <Header />
      <main className={styles['main']}>
        <section className={styles['section-1']}>Section 1</section>
        <section className={styles['section-2']}>Section 2</section>
      </main>
    </>
  );
}

export default App;
