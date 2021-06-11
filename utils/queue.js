const _ = require("lodash");

class Queue {
  constructor(queue) {
    this.queue = new Set(queue);
    this.counter = queue.size > 5 ? queue.size : 5;
  }
  // Add an element to the end of the queue.
  addToQueue(element) {
    this.queue.add(element);
    this.queue = new Set(_.uniqWith([...this.queue], _.isEqual));
    if (this.counter > 5)
      this.counter++;
  }
  // Delete element from queue by index
  deleteFromQueue(element) {
    this.queue.forEach(item => item.username === element.username ? this.queue.delete(item) : item)
    if (this.counter > 5)
      this.counter--;
  }
}

module.exports.Queue = Queue;
