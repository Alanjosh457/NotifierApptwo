const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const webpush = require("web-push");
const bodyParser = require("body-parser");

// Load environment variables
env.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const PUBLIC_VAPID_KEY = process.env.PUBLIC_VAPID_KEY;
const PRIVATE_VAPID_KEY = process.env.PRIVATE_VAPID_KEY;

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize Web Push
if (!PUBLIC_VAPID_KEY || !PRIVATE_VAPID_KEY) {
  console.error("❌ Missing VAPID keys in .env file!");
  process.exit(1);
}

webpush.setVapidDetails(
  "mailto:your-email@example.com",
  PUBLIC_VAPID_KEY,
  PRIVATE_VAPID_KEY
);

// Routes



// Store push subscriptions (use MongoDB if needed)
const subscriptions = [];

// API: Save Subscription
app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ message: "Subscribed successfully!" });
});

// API: Send Notification
app.post("/send-notification", (req, res) => {
  const notificationPayload = JSON.stringify({
    title: "New Notification!",
    body: "You clicked the 'Send Notification' button.",
    icon:  "http://localhost:5000/images/bell1.png",
  });

  const sendPromises = subscriptions.map((sub) =>
    webpush.sendNotification(sub, notificationPayload).catch((err) => console.error(err))
  );

  Promise.all(sendPromises)
    .then(() => res.status(200).json({ message: "Notification sent!" }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Start Server Only After MongoDB Connects
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
