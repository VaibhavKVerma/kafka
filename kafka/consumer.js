const kafka = require('./config');
const topics = require('./topics');

const consumer = kafka.consumer({ groupId: 'test-group' });

const connectAndConsumeConsumer = async () => {
  try {
    await consumer.connect();
    console.log('Consumer connected');

    const topicsList = Object.values(topics).flatMap((ele) => Object.values(ele));

    await consumer.subscribe({ topics: topicsList.map((topic) => topic.name), fromBeginning: false })

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          topic,
          partition,
          key: message.key?.toString(),
          value: message.value?.toString(),
        });
      },
      eachBatch: async ({ batch }) => {
        console.log({ messages: batch.messages, topic: batch.topic, partition: batch.partition });
      }
    });
  } catch (error) {
    console.error('Error connecting consumer:', error);
    throw error;
  }
};

const disconnectConsumer = async () => {
  await consumer.disconnect();
}

module.exports = {
  connectAndConsumeConsumer,
  disconnectConsumer,
};
