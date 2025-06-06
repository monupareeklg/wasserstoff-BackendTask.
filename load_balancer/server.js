const express = require("express");
const router = require("./router");
const logger = require("./logger");
const metrics = require("./metrics");
const FIFOQueue = require("./queue/fifoQueue");
const PriorityQueue = require("./queue/priorityQueue");
const RoundRobinQueue = require("./queue/roundRobinQueue");

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize queues
const fifoQueue = new FIFOQueue();
const priorityQueue = new PriorityQueue();
const roundRobinQueue = new RoundRobinQueue();
roundRobinQueue.addQueue(new FIFOQueue());
roundRobinQueue.addQueue(new FIFOQueue());

app.use(logger);
app.use(metrics);
app.use("/", router);

// Middleware to add requests to queues
app.use((req, res, next) => {
  // Add to FIFO queue
  fifoQueue.enqueue({ req, res });

  // Add to Priority queue with random priority
  priorityQueue.enqueue({ req, res }, Math.floor(Math.random() * 10));

  // Add to Round Robin queue
  roundRobinQueue.enqueue({ req, res });

  next();
});

// Route requests from queues
setInterval(() => {
  const requestFromFIFO = fifoQueue.dequeue();
  if (requestFromFIFO) {
    router.handle(requestFromFIFO.req, requestFromFIFO.res);
  }

  const requestFromPriority = priorityQueue.dequeue();
  if (requestFromPriority) {
    router.handle(requestFromPriority.req, requestFromPriority.res);
  }

  const requestFromRoundRobin = roundRobinQueue.dequeue();
  if (requestFromRoundRobin) {
    router.handle(requestFromRoundRobin.req, requestFromRoundRobin.res);
  }
}, 100);

app.listen(PORT, () => {
  console.log(`Load balancer running on port ${PORT}`);
});
