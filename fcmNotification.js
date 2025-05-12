const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const sendNotification = async (token, message) => {
    const payload = {
        notification: {
            title: 'New Message',
            body: message.content,
        },
        token: token,
    };

    try {
        await admin.messaging().send(payload);
        console.log('Notification sent successfully');
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

module.exports = sendNotification;