import {
  CANCEL_BTN,
  SUBMIT_CREATE_TASK_BTN,
  DESCRIPTION_CREATE_TASK_ERROR,
  DESCRIPTION_CREATE_TASK_FIELD,
  DUE_DATE_CREATE_TASK_ERROR,
  DUE_DATE_CREATE_TASK_FIELD,
  DESCRIPTION_EDIT_TASK_FIELD,
  DESCRIPTION_EDIT_TASK_ERROR,
  DUE_DATE_EDIE_TASK_FIELD,
  DUE_DATE_EDIT_TASK_ERROR,
  SUBMIT_EDIT_TASK_BTN,
  CANCEL_BTN_EDIT,
  EDIT_BODY,
  CREATE_BODY,
} from "./domService.js";
import useForm from "./formService.js";
import { Task } from "../models/taskManagerModel.js";
import { handleChangeStatus, handleDeleteTask, handleAddTF } from "../app.js";
import { setItemInLocalStorage } from "../services/localStorageService.js";
import { onSubmitEditTask } from "../app.js";

const { onChangeInputField, onClearFormFields } = useForm();

const cancelB = () => {
  if (DESCRIPTION_CREATE_TASK_FIELD.value || DUE_DATE_CREATE_TASK_FIELD.value) {
    const conf = confirm("are you sure you want to cancel?");
    if (conf) handleCancelCreateTask();
  }
};

CANCEL_BTN.addEventListener("click", () => {
  cancelB();
});

const cancelEH = () => {
  const conf = confirm("are you sure you want to cancel?");
  if (conf) {
    onCancelEditTask();
  }
};
CANCEL_BTN_EDIT.addEventListener("click", cancelEH);

export const handleCreatTask = () => {
  createTaskFromFieldsListeners();
};

export const handleCancelCreateTask = () => {
  const fields = [DESCRIPTION_CREATE_TASK_FIELD, DUE_DATE_CREATE_TASK_FIELD];
  const errorSpans = [
    DESCRIPTION_CREATE_TASK_ERROR,
    DUE_DATE_CREATE_TASK_ERROR,
  ];
  onClearFormFields(SUBMIT_CREATE_TASK_BTN, fields, errorSpans);
};

export const onCreateNewTask = (tasks) => {
  let status = "Uncompleted";
  let newArray = [...tasks];
  try {
    const task = new Task(
      DESCRIPTION_CREATE_TASK_FIELD.value,
      DUE_DATE_CREATE_TASK_FIELD.value.split("-").reverse().join("/"),
      status,
      tasks
    );
    newArray.push(task);
    setItemInLocalStorage("taskM", JSON.stringify(newArray));
    return newArray;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};
export const onEditTask = (tasks, id) => {
  const task = tasks.find((task) => task.id === id);
  if (!task) throw new Error("no tasks found");
  task.description = DESCRIPTION_EDIT_TASK_FIELD.value;
  task.dueDate = DUE_DATE_EDIE_TASK_FIELD.value.split("-").reverse().join("/");
  setItemInLocalStorage("taskM", JSON.stringify(tasks));
  return tasks;
};

export const mapToModel = (tasks, id) => {
  let task = tasks.find((t) => t.id === id);
  if (!task) throw new Error(`No tasks with id: ${id} was found`);
  const { description, dueDate } = task;
  DESCRIPTION_EDIT_TASK_FIELD.value = description;
  DUE_DATE_EDIE_TASK_FIELD.value = dueDate.split("/").reverse().join("-");
};
export const handleEditTask = (tasks, id) => {
  CREATE_BODY.classList = "d-none";
  EDIT_BODY.className = "d-block";
  EDIT_BODY.className = "center";
  editTaskListeners();
  mapToModel(tasks, id);
  const anonymousFunc = () => onSubmitEditTask(id);
  SUBMIT_EDIT_TASK_BTN.addEventListener("click", anonymousFunc);
};
export const onCancelEditTask = () => {
  const errorsSpans = [DESCRIPTION_EDIT_TASK_ERROR, DUE_DATE_EDIT_TASK_ERROR];
  onClearFormFields(SUBMIT_EDIT_TASK_BTN, [], errorsSpans);
  EDIT_BODY.className = "d-none";
  CREATE_BODY.classList = "d-block";
  CREATE_BODY.classList = "center";
  handleCreatTask();
};

export const createTaskFromFieldsListeners = () => {
  const schema = ["description", "due-date-field"];
  DESCRIPTION_CREATE_TASK_FIELD.addEventListener("input", (e) => {
    const validation = {
      min: 2,
      upperCase: true,
      lowerCase: true,
    };
    const element = {
      input: e.target,
      errorSpan: DESCRIPTION_CREATE_TASK_ERROR,
      validation,
    };
    onChangeInputField(schema, element, SUBMIT_CREATE_TASK_BTN);
  });
  DUE_DATE_CREATE_TASK_FIELD.addEventListener("input", (e) => {
    const validation = {
      date: e.target.value,
    };
    const element = {
      input: e.target,
      errorSpan: DUE_DATE_CREATE_TASK_ERROR,
      validation,
    };
    onChangeInputField(schema, element, SUBMIT_CREATE_TASK_BTN);
  });
};
const editTaskListeners = () => {
  const schema = ["description-edit", "due-date-edit-field"];
  DESCRIPTION_EDIT_TASK_FIELD.addEventListener("change", (e) => {
    const validation = {
      min: 2,
      upperCase: true,
      lowerCase: true,
    };
    const element = {
      input: e.target,
      errorSpan: DESCRIPTION_EDIT_TASK_ERROR,
      validation,
    };
    onChangeInputField(schema, element, SUBMIT_EDIT_TASK_BTN);
  });
  DUE_DATE_EDIE_TASK_FIELD.addEventListener("change", (e) => {
    const validation = {
      min: 2,
    };
    const element = {
      input: e.target,
      errorSpan: DUE_DATE_EDIT_TASK_ERROR,
      validation,
    };
    onChangeInputField(schema, element, SUBMIT_EDIT_TASK_BTN);
  });
};
export const onRender = (tasks) => {
  tasks.forEach((task) => {
    addEventOnDelete(task.id);
    addOnEditTask(tasks, task.id);
    addChangeStatus(task.id, tasks);
    addToFav(task.id, tasks);
  });
};
const addEventOnDelete = (id) => {
  const deleteButton = document.getElementById(`delete${id}`);
  deleteButton.addEventListener("click", () => handleDeleteTask(id));
};
const addOnEditTask = (tasks, id) => {
  document
    .getElementById(`edit${id}`)
    .addEventListener("click", () => handleEditTask(tasks, id));
};
const addChangeStatus = (id, tasks) => {
  const checkboxbtn = document.getElementById(`checkbox${id}`);
  checkboxbtn.addEventListener("click", () => handleChangeStatus(id, tasks));
};
const addToFav = (id, tasks) => {
  const addTF = document.getElementById(`addTF${id}`);
  addTF.addEventListener("click", () => handleAddTF(id, tasks));
};
