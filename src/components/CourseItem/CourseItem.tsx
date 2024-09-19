import styles from './CourseItem.module.scss';

interface CourseItemProps {
  title: string;
  value: number;
}

export default function CourseItem({ title, value }: CourseItemProps) {
  return (
    <div className={styles['course']}>
      <h6 className={styles['title']}>{title}</h6>
      <p className={styles['value']}>{value.toFixed(2)}</p>
    </div>
  );
}
