import Image from 'next/image';
import styles from './page.module.css';
import bell from '../images/bell.png';
import illus from '../images/illus.png';

const Page = () => {
  return (
    <div className={styles.page}>
      {/* Top Heading */}
      <div className={styles.heading}>Hola!</div>

      {/* Centered Notification Icon with Circles */}
      <div className={styles.iconContainer}>
        <Image src={illus} alt="Circles Effect" className={styles.illus} />
        <Image src={bell} alt="Bell Icon" className={styles.bell} />
      </div>

      {/* Text Section */}
      <div className={styles.textContainer}>
        <h2 className={styles.title}>Lorem Ipsum...</h2>
        <p className={styles.subtitle}>Lorem ipsum dolor sit amet.</p>
      </div>

      {/* Button */}
      <button className={styles.button}>Send Notification</button>
    </div>
  );
};

export default Page;
