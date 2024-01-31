const { getId } = require('./utils');
const ToDoItem = require('./ToDoItem');

class ToDoList {
  constructor() {
    this.id = getId();
  }
}

module.exports = ToDoList;
