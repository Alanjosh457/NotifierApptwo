const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;



export const sendNotification = async () => {
    const response = await fetch(`${BACKEND_URL}/send-notification`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
           
        },
        body: JSON.stringify({
            title: 'New Notification!',
            body: 'You clicked the "Send Notification" button.'
        })
    });

    if (response.status === 200) {
        return response.json();
    }
    throw new Error('Failed to send notification');
};




export const subscribeToNotifications = async (subscription) => {
  const response = await fetch(`${BACKEND_URL}/subscribe`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscription)
  });

  if (response.status === 201) {
      return response.json();
  }
  throw new Error('Failed to subscribe for notifications');
};
