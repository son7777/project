import { onChangePage } from "./routes/router.js";
import {
  HOME_PAGE_LINK,
  TASKM_PAGE_LINK,
  LINK_HOME_PAGE,
  SLIDER_PREV_BTN,
  SLIDER_NEXT_BTN,
  button,
  F_Name_input,
  phon_input,
  popup,
  close_icon2,
  ad_to_favorite_sidebar,
  close_icon,
  addToFavorite,
  SEARCH_BAR,
  SORT_DOWN_ICON,
  SORT_UP_ICON,
  SUBMIT_CREATE_TASK_BTN,
  ACTIV_TASK_BTN,
} from "./services/domService.js";
import PAGES from "./models/pageModel.js";
import { renderSlider as render } from "./services/renderSlider.js";
import { setCounter } from "./services/picService.js";
import initialData from "./initialData/initialData.js";
import {
  handleCreatTask,
  handleCancelCreateTask,
  onCreateNewTask,
  onEditTask,
  onCancelEditTask,
  onRender,
} from "./services/tasksService.js";
import { TaskManager, Task } from "./models/taskManagerModel.js";
import renderTable from "./services/renderTable.js";
import {
  setItemInLocalStorage,
  getItemFromLocalStorage,
} from "./services/localStorageService.js";
import {
  sortArrayOfObject,
  filterArrayOfObjectsByTerm,
} from "./utils/algoMethods.js";
let scrolled = false;
button.style.display = "none";
window.onscroll = () => {
  const windowHeight = window.innerHeight;

  const html = document.documentElement;
  const scrollTop = window.pageYOffset || html.scrollTop;
  if (scrollTop > windowHeight * 0.05 && !scrolled) {
    button.style.display = "block";
    button.style.position = "fixed";
    button.style.zIndex = "0";
    button.style.bottom = "166px";
    button.style.right = "13px";
    button.style.transform = "rotate(-2deg)";
    scrolled = true;
  } else if (scrollTop <= windowHeight * 0.05 && scrolled) {
    button.style.display = "none";
    scrolled = false;
  }
};

let tasks;
if (getItemFromLocalStorage("taskM")) {
  const sTasks = JSON.parse(getItemFromLocalStorage("taskM")).map(
    (task) => new Task(task.description, task.dueDate, task.status)
  );
  tasks = sTasks;
} else {
  let sTasks = [];
  tasks = sTasks;
}
//#region הגדרת משתנים גלובליים
let { pictures } = initialData();
let counter = 0;

// export let favorites_Tasks;
// if (!getItemFromLocalStorage("favorites_Tasks")) {
//   favorites_Tasks = [];
// } else {
//   favorites_Tasks = getItemFromLocalStorage("favorites_Tasks");
// }
// export let favorites_colors;
// if (!getItemFromLocalStorage("favorites_colors")) {
//   favorites_colors = [];
// } else {
//   favorites_colors = getItemFromLocalStorage("favorites_colors");
// }

//#endregion

render(pictures);

//slider logic
let intervalId;

const startInterval = () => {
  intervalId = setInterval(() => {
    counter = setCounter(pictures, counter, "next");
    render(pictures, counter);
  }, 5000);
};

const stopInterval = () => {
  clearInterval(intervalId);
};

const onChangeSliderPic = (controller) => {
  stopInterval();
  counter = setCounter(pictures, counter, controller);
  render(pictures, counter);
  startInterval();
};
startInterval();
export let TASK_MANAGER = new TaskManager();
renderTable(tasks);
if (tasks.length) {
  onRender(tasks);
}

//#region האזנה לאירועים
// ניתוב דפים
HOME_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.HOME));
TASKM_PAGE_LINK.addEventListener("click", () => {
  onChangePage(PAGES.TASKM);
  handleCreatTask();
  renderTable(tasks);
  onRender(tasks);

  // renderFavorites(favorites_Tasks);
});

LINK_HOME_PAGE.addEventListener("click", () => onChangePage(PAGES.HOME));

// מצגת תמונות
SLIDER_PREV_BTN.addEventListener("click", () => onChangeSliderPic("prev"));
SLIDER_NEXT_BTN.addEventListener("click", () => onChangeSliderPic("next"));
// פופאפים
close_icon2.addEventListener("click", () => {
  popup.style.left = "-1600px";
  phon_input.value = "";
  F_Name_input.value = "";
});
button.addEventListener("click", () => {
  popup.style.left = "0px";
});
addToFavorite.addEventListener("click", () => {
  ad_to_favorite_sidebar.style.right = "0px";
});
close_icon.addEventListener("click", () => {
  ad_to_favorite_sidebar.style.right = "-400px";
});
//#endregion
//#region Create Task
export const handleSubmitNewTask = () => {
  tasks = onCreateNewTask(tasks);
  renderTable(tasks);
  onRender(tasks);
  handleCancelCreateTask();
};
SUBMIT_CREATE_TASK_BTN.addEventListener("click", () => {
  handleSubmitNewTask(tasks);
});

//#endregion
// שדה חיפוש
SEARCH_BAR.addEventListener("input", (e) => debouncedInput(e));

//#endregion
export const handleChangeStatus = (id, tasks) => {
  const task = tasks.find((task) => task.id === id);
  if (!task) throw new Error("no tasks found");
  if (task.status === "Completed") {
    task.status = "Uncompleted";
  } else {
    task.status = "Completed";
  }
  setItemInLocalStorage("taskM", JSON.stringify(tasks));
  renderTable(tasks);
  onRender(tasks);
  return tasks;
};
//#region Delete Tasks
export const handleDeleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
  renderTable(tasks);
  onRender(tasks);
  setItemInLocalStorage("taskM", JSON.stringify(tasks));
};
//#endregion

//#region Edit Tasks
export const onSubmitEditTask = (id) => {
  tasks = onEditTask(tasks, id);
  onCancelEditTask(tasks);
  renderTable(tasks);
  onRender(tasks);
};
//#endregion

//#region sorting
SORT_DOWN_ICON.addEventListener("click", () => {
  tasks = sortArrayOfObject(tasks, "description");
  renderTable(tasks);
  onRender(tasks);
});

SORT_UP_ICON.addEventListener("click", () => {
  tasks = sortArrayOfObject(tasks, "description", true);
  renderTable(tasks);
  onRender(tasks);
});

//#endregion

//#region filter Tasks
const handleFilterTasks = (term) => {
  const newTasks = filterArrayOfObjectsByTerm(term, tasks, "description");
  renderTable(newTasks);
  onRender(newTasks);
};
//#endregion
let timeoutId;
const debouncedInput = (e) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    handleFilterTasks(e.target.value);
  }, 1000);
};
ACTIV_TASK_BTN.addEventListener("click", () => handleActivTasks(tasks));
const handleActivTasks = (tasks) => {
  if (ACTIV_TASK_BTN.value === "CLICK-TO-SHOW-ONLY-ACTIV-TASKS") {
    let newT = tasks
      .filter(
        (task) =>
          new Date(task.dueDate.split("/").reverse().join("-")).getTime() >
          new Date().getTime()
      )
      .filter((t) => t.status === "Uncompleted");
    ACTIV_TASK_BTN.value = "CLICK-TO-SHOW-ALL-TASKS";
    renderTable(newT);
    onRender(newT);
  } else {
    ACTIV_TASK_BTN.value = "CLICK-TO-SHOW-ONLY-ACTIV-TASKS";
    renderTable(tasks);
    onRender(tasks);
  }
};
