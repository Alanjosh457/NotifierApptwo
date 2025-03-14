'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import bell from '../images/bell.png';
import illus from '../images/illus.png';

const Page = () => {
  const [showPermissionPopup, setShowPermissionPopup] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        setShowPermissionPopup(true); // Show modal if permission is not granted/denied
      } else if (Notification.permission === 'granted') {
        setIsPermissionGranted(true);
      }
    }
  }, []);

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          setIsPermissionGranted(true);
          alert('Notifications enabled!');
        } else {
          alert('You have blocked notifications.');
        }
        setShowPermissionPopup(false);
      });
    }
  };

  const handleNotification = () => {
    if (!isPermissionGranted) {
      alert('Please allow notifications first.');
      return;
    }

    new Notification('🔔 Notification', {
      body: 'Notification sent!',
      icon: '/bell.png', // Ensure this image exists in your public folder
    });
  };

  return (
    <div className={styles.page}>
      {/* Custom Allow Notification Popup */}
      {showPermissionPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Enable Notifications</h3>
            <p>Get notified instantly about updates.</p>
            <button className={styles.allowButton} onClick={requestNotificationPermission}>
              Allow Notifications
            </button>
          </div>
        </div>
      )}

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
      <button className={styles.button} onClick={handleNotification} disabled={!isPermissionGranted}>
        Send Notification
      </button>
    </div>
  );
};

export default Page;
