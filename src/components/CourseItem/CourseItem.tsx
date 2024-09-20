import styles from './CourseItem.module.scss';

interface CourseItemProps {
  title: string;
  value: number;
}

export default function CourseItem({ title, value }: CourseItemProps) {
  return (
    <div className={styles['course']}>
      <h6 className="p2 curr-code">{title}</h6>
      <p className="p3 tabular">{value.toFixed(2)}</p>
    </div>
  );
}
