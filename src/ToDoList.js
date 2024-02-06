const { getId } = require('./utils');
const ToDoItem = require('./ToDoItem');

class ToDoList {
  static #allTodos = []

  constructor(name) {
    this.id = getId()
    this.name = name 
    this.tasks = []
    ToDoList.#allTodos.push(this)
  }

  createItem(todoName, priorityLevel) {
    const newTodo = new ToDoItem(todoName, priorityLevel)
    this.tasks.push(newTodo)
    return newTodo
  }

  getItems() {
    return [...this.tasks]
  }

  getCompletedCount() {
    const completedCount = this.getItems().filter(todo => todo.isDone).length
    return completedCount
  }

  static list() {
    return [...ToDoList.#allTodos]
  }

  static findBy(instanceId) {
    return ToDoList.list().find(list => list.id === instanceId)
  }

  countRemainingTasks() { // Extra 
    return this.getItems().filter(todo => !todo.isDone).length
  }

}

module.exports = ToDoList;
