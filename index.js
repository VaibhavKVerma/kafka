const express = require('express');

const app = express();
const kafkaAdmin = require('./kafka/admin');
const producer = require('./kafka/producer');
const consumer = require('./kafka/consumer');
const topics = require('./kafka/topics');


app.get('/', async (req, res) => {
    await producer.sendSingle(topics.firstService.firstFunction.name,'how are you','im fine',3)
    res.send('Hello');
})

const init = async () => {
    try {
        await kafkaAdmin();
        await producer.connectProducer();
        await consumer.connectAndConsumeConsumer();

        const handleClose = async () => {
            await producer.disconnectProducer();
            await consumer.disconnectConsumer();
            process.exit(0);
        }
        process.on('SIGINT', handleClose);
        process.on('SIGTERM', handleClose);

        app.listen(3000, () => {
            console.log("Connection Started on PORT", 3000);
        });
    } catch (error) {
        console.error("Initialization error:", error);
        process.exit(1);
    }
};

init();