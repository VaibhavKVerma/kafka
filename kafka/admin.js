const kafka = require('./config');
const topics = require('./topics');

const run = async () => {
  const admin = kafka.admin();
  await admin.connect();
  const kafkaTopics = await admin.listTopics();
  const topicsList = Object.values(topics).flatMap((ele) => Object.values(ele));

  const kafkaMissingTopics = topicsList.filter((topic) => !kafkaTopics.includes(topic.name));
  const kafkaExtraTopics = kafkaTopics.filter((topic) => !topicsList.map((topic) => topic.name).includes(topic));

  await admin.deleteTopics({
    topics: kafkaExtraTopics
  })
  await admin.createTopics({
    topics: kafkaMissingTopics.map((topic) => {
      return {
        topic: topic.name,
        numPartitions: topic.partitions
      }
    })
  })

  await admin.disconnect();
};

module.exports = run;