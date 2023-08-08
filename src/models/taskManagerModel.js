import { randomNumBetween } from "../utils/algoMethods.js";
export const TaskStatus = Object.freeze({
  Uncompleted: "Uncompleted",
  Completed: "Completed",
});
export class Task {
  description;
  dueDate;
  status;
  #id;
  constructor(descript, DueDate, status, array = []) {
    this.description = descript;
    this.dueDate = DueDate;
    this.status = status;
    this.generateId(array);
  }
  generateId(array) {
    const random = randomNumBetween(1_000_000, 9_999_999);
    const task = array.find((task) => task.id === random);
    if (!task) return (this.#id = random);
    this.generateId(array);
  }

  get id() {
    return this.#id;
  }
}
export class TaskManager {
  tasks;
  constructor() {
    this.tasks = [];
  }
  add(task) {
    this.tasks.push(task);
  }
  deleteTask(ID) {
    this.tasks = this.tasks.filter((t) => t.id !== ID);
  }
  getUnCompletedTasks() {
    let newArray = this.tasks
      .filter((task) => task.status === TaskStatus.Uncompleted)
      .filter(
        (task) =>
          new Date(task.dueDate.split("/").reverse().join("-")).getTime() >
          new Date().getTime()
      );
    return newArray;
  }
}
