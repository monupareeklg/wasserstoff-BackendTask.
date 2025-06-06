class RoundRobinQueue {
  constructor() {
    this.queues = [];
    this.currentQueue = 0;
  }

  addQueue(queue) {
    this.queues.push(queue);
  }

  enqueue(request) {
    this.queues[this.currentQueue].enqueue(request);
    this.currentQueue = (this.currentQueue + 1) % this.queues.length;
  }

  dequeue() {
    let request = null;
    for (let i = 0; i < this.queues.length; i++) {
      const queue = this.queues[(this.currentQueue + i) % this.queues.length];
      if (queue.size() > 0) {
        request = queue.dequeue();
        this.currentQueue = (this.currentQueue + i + 1) % this.queues.length;
        break;
      }
    }
    return request;
  }

  size() {
    return this.queues.reduce((acc, queue) => acc + queue.size(), 0);
  }
}

module.exports = RoundRobinQueue;