class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(request, priority) {
    const newRequest = { request, priority };
    let added = false;
    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i].priority > newRequest.priority) {
        this.queue.splice(i, 0, newRequest);
        added = true;
        break;
      }
    }
    if (!added) {
      this.queue.push(newRequest);
    }
  }

  dequeue() {
    if (this.queue.length === 0) {
      return null;
    }
    return this.queue.shift().request;
  }

  size() {
    return this.queue.length;
  }
}

module.exports = PriorityQueue;
