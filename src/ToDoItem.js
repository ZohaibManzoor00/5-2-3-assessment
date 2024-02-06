const { getId } = require('./utils');

class ToDoItem {
  constructor(description, priorityLevel) {
    this.id = getId();
    this.description = description
    this.priorityLevel = priorityLevel
    this.isDone = false 
    this.isHighPriority = priorityLevel > 5 // Extra
  }

  setToDoComplete() { // Extra
    this.isDone = true 
  }
}

module.exports = ToDoItem;
