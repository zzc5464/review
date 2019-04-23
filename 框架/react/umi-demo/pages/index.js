
import styles from './index.css';
import Link from 'umi/link';

export default function() {
  return (
    <div className={styles.normal}>
      <h1>Page index</h1>
      <Link to='/user'>go user</Link>
    </div>
  );
}
