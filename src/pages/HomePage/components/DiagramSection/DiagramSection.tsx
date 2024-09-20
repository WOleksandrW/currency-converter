import img from '../../../../assets/diagram.png';
import styles from './DiagramSection.module.scss';

export default function DiagramSection() {
  return (
    <section className={styles['diagram-section']}>
      <h2 className="h1">Diagram</h2>
      <p className="p1">In progress...</p>
      <img className={styles['diagram']} src={img} alt="Diagram placeholder" />
    </section>
  );
}
