const kafka = require('./config');

const producer = kafka.producer({
    allowAutoTopicCreation: false
});

const connectProducer = async () => {
    try {
        await producer.connect();
        console.log('Producer connected');
    } catch (error) {
        console.error('Error connecting producer:', error);
        throw error;
    }
};

const sendSingle = async (topic, key, value, partition = null) => {
    if (!topic || typeof topic !== 'string') {
        throw new Error('Invalid topic');
    }
    if (!value) {
        throw new Error('Message value cannot be null or undefined');
    }

    try {
        await producer.send({
            topic,
            messages: [{ key, value, partition }],
        });
        console.log(`Message sent to topic "${topic}"`);
    } catch (error) {
        console.error(`Error sending message to topic "${topic}":`, error);
        throw error;
    }
};

const sendInBatch = async (topicMessages) => {
    if (!Array.isArray(topicMessages)) {
        throw new Error('Invalid input: topicMessages should be an array');
    }

    try {
        await producer.sendBatch({ topicMessages });
        console.log('Batch messages sent successfully');
    } catch (error) {
        console.error('Error sending batch messages:', error);
        throw error;
    }
};

const disconnectProducer = async () => {
    try {
        await producer.disconnect();
        console.log('Producer disconnected');
        return true;
    } catch (error) {
        console.error('Error disconnecting producer:', error);
        return false;
    }
};

module.exports = {
    connectProducer,
    sendSingle,
    sendInBatch,
    disconnectProducer,
};
