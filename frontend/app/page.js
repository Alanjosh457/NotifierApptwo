'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import bell from '../images/bell.png';
import illus from '../images/illus.png';
import { sendNotification, subscribeToNotifications } from '@/app/lib/services/auth'; // Adjust path as needed

const Page = () => {
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const registerServiceWorkerAndSubscribe = async () => {
  

      if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
          // Register service worker
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('Service Worker registered:', registration);

          // Request permission for notifications
          const permission = await Notification.requestPermission();
          if (permission !== 'granted') {
            console.warn('Notification permission denied');
            return;
          }

          // Subscribe user to push notifications
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.NEXT_PUBLIC_VAPID_KEY // Ensure VAPID key is in .env
          });

          await subscribeToNotifications(subscription);
          setSubscription(subscription); // Store subscription in state
          console.log('User subscribed:', subscription);
        } catch (error) {
          console.error('Service Worker or subscription failed:', error);
        }
      }
    };

    registerServiceWorkerAndSubscribe();
  }, []);

  const handleNotification = async () => {
    if (!subscription) {
      alert('Subscription not ready. Try again in a few seconds.');
      return;
    }

    try {
      const data = await sendNotification();
      console.log('Notification sent:', data);
      alert('Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Error sending notification');
    }
  };

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
      <button className={styles.button} onClick={handleNotification}>
        Send Notification
      </button>
    </div>
  );
};

export default Page;
