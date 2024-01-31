const path = require('path');
const ScoreCounter = require('score-tests');
const ToDoList = require('./ToDoList');
const ToDoItem = require('./ToDoItem');

const testSuiteName = 'Design Challenge Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

describe(testSuiteName, () => {
  /* **************** */
  // TODO ITEM
  /* **************** */

  it('ToDoItem - Creates the minimum required instance properties', () => {
    const description = 'Do the dishes';
    const priorityLevel = 10;
    const myItem = new ToDoItem(description, priorityLevel);

    expect(myItem).toBeInstanceOf(ToDoItem);
    expect(myItem).toHaveProperty('id');
    expect(myItem.description).toBe(description);
    expect(myItem.priorityLevel).toBe(priorityLevel);
    expect(myItem.isDone).toBe(false);

    // ids should be sequential
    const mySecondItem = new ToDoItem('blah', 1);
    expect(mySecondItem.id).toBe(myItem.id + 1);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  /* **************** */
  // TODO LIST
  /* **************** */

  it('ToDoList - Creates the minimum required instance properties', () => {
    const myList = new ToDoList("This week's tasks");

    expect(myList).toBeInstanceOf(ToDoList);
    expect(myList).toHaveProperty('id');
    expect(myList.name).toBe("This week's tasks");

    // ids should be sequential
    const mySecondList = new ToDoList('blah');
    expect(mySecondList.id).toBe(myList.id + 1);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('ToDoList - Has the minimum required instance methods', () => {
    expect(ToDoList.prototype.createItem).toEqual(expect.any(Function));
    expect(ToDoList.prototype.getItems).toEqual(expect.any(Function));
    expect(ToDoList.prototype.getCompletedCount).toEqual(expect.any(Function));

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('ToDoList - createItem(): Can create a ToDoItem that belongs to it', () => {
    const chores = new ToDoList("This week's tasks");
    const doDishes = chores.createItem('Do the dishes', 1);
    expect(doDishes).toBeInstanceOf(ToDoItem);

    const finishHW = chores.createItem('Finish homework', 10);
    expect(finishHW).toBeInstanceOf(ToDoItem);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('ToDoList - getItems(): returns all items that belong to it', () => {
    const chores = new ToDoList('Chores');
    const doLaundry = chores.createItem('laundry', 1);
    const cleanCar = chores.createItem('wash car', 2);
    const vacuum = chores.createItem('vacuum', 3);

    expect(chores.getItems()).toEqual([doLaundry, cleanCar, vacuum]);

    const funTasks = new ToDoList('fun weekend tasks');
    const goHiking = funTasks.createItem('Go hiking', 8);
    const goSwimming = funTasks.createItem('Go swimming', 3);

    expect(funTasks.getItems()).toEqual([goHiking, goSwimming]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('ToDoList - getItems(): returns a copy of the items that belong to it, not the original', () => {
    const chores = new ToDoList('Chores');
    const doLaundry = chores.createItem('laundry', 1);
    const cleanCar = chores.createItem('wash car', 2);
    const vacuum = chores.createItem('vacuum', 3);

    // get the array of items. it should be a copy
    const todos = chores.getItems();

    // push a random object into the array
    todos.push({});

    // it shouldn't be added to the instance's own list
    const todosAgain = chores.getItems();
    expect(todosAgain.length).toBe(3);
    expect(todosAgain).toEqual([doLaundry, cleanCar, vacuum]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('ToDoList - getCompletedCount(): returns the number of completed items in the list', () => {
    const chores = new ToDoList('Chores');
    chores.createItem('laundry', 1);
    const cleanCar = chores.createItem('wash car', 2);
    const vacuum = chores.createItem('vacuum', 3);

    expect(chores.getCompletedCount()).toBe(0);

    vacuum.isDone = true;
    cleanCar.isDone = true;
    expect(chores.getCompletedCount()).toBe(2);

    cleanCar.isDone = false;
    expect(chores.getCompletedCount()).toBe(1);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  /* **************** */
  // CLASS METHODS
  /* **************** */

  it('ToDoList - Has the minimum required class methods', () => {
    expect(ToDoList.list).toEqual(expect.any(Function));
    expect(ToDoList.findBy).toEqual(expect.any(Function));

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('ToDoList - list(): Can list all instances of the class', () => {
    const chores = new ToDoList(ToDoItem, "This week's tasks");
    const groceries = new ToDoList(ToDoItem, "This week's groceries");
    const homework = new ToDoList(ToDoItem, "This week's homework");

    expect(ToDoList.list()).toContain(chores);
    expect(ToDoList.list()).toContain(groceries);
    expect(ToDoList.list()).toContain(homework);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('ToDoList - list(): the list returned is a shallow copy of the internal state', () => {
    const chores = new ToDoList(ToDoItem, "This week's tasks");
    const groceries = new ToDoList(ToDoItem, "This week's groceries");

    const allLists = ToDoList.list();
    allLists.length = 0;

    expect(ToDoList.list().length).toBeGreaterThan(0);
    expect(ToDoList.list()).toContain(chores);
    expect(ToDoList.list()).toContain(groceries);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('ToDoList - findBy(): Can find an instance of itself by id', () => {
    const chores = new ToDoList(ToDoItem, "This week's tasks");
    const groceries = new ToDoList(ToDoItem, "This week's groceries");
    const homework = new ToDoList(ToDoItem, "This week's homework");

    expect(ToDoList.findBy(chores.id)).toBe(chores);
    expect(ToDoList.findBy(groceries.id)).toBe(groceries);
    expect(ToDoList.findBy(homework.id)).toBe(homework);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  /* **************** */
  // BONUS PROPERTIES
  /* **************** */

  it('ToDoItem - Has at *least* one extra instance property', () => {
    const doDishes = new ToDoItem('Do the dishes', 1);

    const minimumProperties = [
      'id', 'description',
      'priorityLevel', 'isDone',
    ];
    const actualPropertyCount = Object.keys(doDishes).length;
    expect(actualPropertyCount).toBeGreaterThan(minimumProperties.length);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('ToDoItem - Has at *least* one extra instance method', () => {
    const minimumMethods = ['constructor'];
    const actualMethodCount = Object.getOwnPropertyNames(ToDoItem.prototype).length;
    expect(actualMethodCount).toBeGreaterThan(minimumMethods.length);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('ToDoList - Has at *least* one extra instance property', () => {
    const chores = new ToDoList('Chores');

    const minimumProperties = ['id', 'name'];
    const actualPropertyCount = Object.keys(chores).length;
    expect(actualPropertyCount).toBeGreaterThan(minimumProperties.length);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('ToDoList - Has at *least* one extra instance method', () => {
    const minimumMethods = ['constructor', 'createItem', 'getItems', 'getCompletedCount'];
    const actualMethodCount = Object.getOwnPropertyNames(ToDoList.prototype).length;
    expect(actualMethodCount).toBeGreaterThan(minimumMethods.length);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  // IGNORE PLEASE
  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
});
