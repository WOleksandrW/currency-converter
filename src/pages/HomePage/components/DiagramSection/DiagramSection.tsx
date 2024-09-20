import img from '../../../../assets/diagram.png';
import styles from './DiagramSection.module.scss';

export default function DiagramSection() {
  return (
    <section className={styles['diagram-section']}>
      <h2 className={styles['title']}>Diagram</h2>
      <p className={styles['message']}>In progress...</p>
      <img className={styles['diagram']} src={img} alt="Diagram placeholder" />
    </section>
  );
}
