// Initialize Firebase Admin SDK
const admin = require('firebase-admin');
const serviceAccount = require('../firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


class NotificationController {
    async sendNotification(req, res) {
      const message = {
        notification: {
          title: req.body.title,
          body: req.body.message
        },
        token: req.body.token
      };
  
      admin.messaging().send(message)
        .then((response) => {
          res.status(200).send('Notification sent successfully: ' + response);
        })
        .catch((error) => {
          res.status(500).send('Failed to send notification: ' + error);
        });
    }
  }

  
  
  
module.exports = new NotificationController();



// const admin = require('firebase-admin');
// const serviceAccount = require('../firebase-adminsdk.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// const Device = require('../models/deviceModel'); // Import the Device model

// class NotificationController {
//     async sendNotification(req, res) {
//         try {
//             const devices = await Device.find(); // Fetch all device tokens from the database
//             const tokens = devices.map(device => device.token); // Extract tokens

//             const message = {
//                 notification: {
//                     title: req.body.title,
//                     body: req.body.message
//                 },
//                 tokens: tokens // Note: using 'tokens' to send batch notifications
//             };

//             const response = await admin.messaging().sendMulticast(message);
//             if (response.failureCount > 0) {
//                 const failedTokens = [];
//                 response.responses.forEach((resp, idx) => {
//                     if (!resp.success) failedTokens.push(tokens[idx]);
//                 });
//                 console.log('List of tokens that caused failures: ', failedTokens);
//             }
            
//             res.status(200).send(`Notification sent successfully to ${response.successCount} devices`);
//         } catch (error) {
//             console.error('Failed to send notification:', error);
//             res.status(500).send(`Failed to send notification: ${error}`);
//         }
//     }
// }

// module.exports = new NotificationController();
