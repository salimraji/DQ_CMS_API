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









// Ssocket IO integrated
// const admin = require('firebase-admin');
// const serviceAccount = require('../firebase-adminsdk.json');
// const express = require('express')
// const http = require('http');
// const { Server } = require("socket.io");
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: '*',
//         methods: ["GET", "POST"]
//     }
// });


// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });


// class NotificationController {
//   async sendNotification(req, res) {
//       const message = {
//           notification: {
//               title: req.body.title,
//               body: req.body.message
//           },
//           token: req.body.token
//       };

//       admin.messaging().send(message)
//           .then((response) => {
//               // Emit only non-sensitive parts of the notification
//               io.emit('notification', {
//                   title: req.body.title,
//                   message: req.body.message
//               });
//               res.status(200).send('Notification sent successfully: ' + response);
//           })
//           .catch((error) => {
//               res.status(500).send('Failed to send notification: ' + error);
//           });
//   }
// }
  
  
  
// module.exports = new NotificationController();









// check all the devices inside the database
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
