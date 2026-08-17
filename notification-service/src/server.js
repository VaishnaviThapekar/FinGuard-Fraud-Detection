const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { Kafka } = require('kafkajs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 8085;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'notification-service' });
});

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  
  socket.on('subscribe_alerts', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} subscribed to targeted alert channel`);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Configure Kafka client
const kafka = new Kafka({
  clientId: 'notification-service',
  brokers: [process.env.KAFKA_BROKERS || 'localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'notification-group' });

async function initKafka() {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: 'fraud-alerts', fromBeginning: false });
    console.log('Notification Service successfully subscribed to Kafka: fraud-alerts');

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const payload = JSON.parse(message.value.toString());
        console.log(`Processing fraud alert event:`, payload);

        // 1. Broadcast to WebSocket client via Socket.io
        io.emit('fraud_alert_broadcast', payload);

        // 2. Target specific user socket channel
        if (payload.userId) {
          io.to(payload.userId).emit('fraud_alert_personal', payload);
        }

        // 3. Mock External Alerts (SMS & Email)
        console.log(`[SMS DISPATCH] Alert sent to user phone for transaction ${payload.transactionId}`);
        console.log(`[EMAIL DISPATCH] Security alert email sent for risk level ${payload.riskLevel}`);
      },
    });
  } catch (error) {
    console.error('Kafka Consumer Initialization Error:', error.message);
  }
}

server.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
  initKafka();
});
