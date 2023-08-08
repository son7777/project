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
  SUBMIT_EDIT_TASK_BTNN,
  CREATE_BODY,
  EDIT_BODYY,
  EDIT_BODY,
  DESCRIPTION_EDIT_TASK_FIELDD,
  DUE_DATE_EDIE_TASK_FIELDD,
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
  editTaskListenerss,
  onefNewTask,
  handleCancelCreateTaskk,
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
import { renderFavorites } from "./components/renderFavorites.js";
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
export let TASK_MANAGER = new TaskManager();
let favorites_Tasks;
TASK_MANAGER.tasks = [...tasks];
//#region הגדרת משתנים גלובליים
let { pictures } = initialData();
let counter = 0;
if (getItemFromLocalStorage("fav")) {
  const sF = JSON.parse(getItemFromLocalStorage("fav")).map(
    (f) => new Task(f.description, f.dueDate, f.status)
  );
  favorites_Tasks = sF;
} else {
  const sF = [];
  favorites_Tasks = sF;
}
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

renderTable(tasks);
if (tasks.length) {
  onRender(tasks);
}
renderFavorites(favorites_Tasks);
//#region האזנה לאירועים
// ניתוב דפים
HOME_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.HOME));
TASKM_PAGE_LINK.addEventListener("click", () => {
  onChangePage(PAGES.TASKM);
  handleCreatTask();
  renderTable(tasks);
  onRender(tasks);
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
export const handleSubmitNewTaskk = () => {
  tasks = onefNewTask(tasks);
  renderTable(tasks);
  onRender(tasks);
  handleCancelCreateTaskk();
};
SUBMIT_CREATE_TASK_BTN.addEventListener("click", () => {
  handleSubmitNewTask(tasks);
});
SUBMIT_EDIT_TASK_BTNN.addEventListener("click", () => {
  handleSubmitNewTaskk(tasks);
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
export const handleAddTF = (id) => {
  const favorite = tasks.find((f) => f.id === id);
  if (!favorite) throw new Error("no favotites found");
  const favoritecheck = favorites_Tasks.find((f) => f.id === id);
  if (favoritecheck) {
    ad_to_favorite_sidebar.style.right = "0px";
  } else {
    favorites_Tasks.push(favorite);
    renderFavorites(favorites_Tasks);
    setItemInLocalStorage("fav", JSON.stringify(favorites_Tasks));
    ad_to_favorite_sidebar.style.right = "0px";
  }
};

//#region Delete Tasks
export const handleDeleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
  renderTable(tasks);
  onRender(tasks);
  setItemInLocalStorage("taskM", JSON.stringify(tasks));
};
//#endregion
export const favdel = (id) => {
  favorites_Tasks = favorites_Tasks.filter((fav) => fav.id !== id);
  renderFavorites(favorites_Tasks);
  setItemInLocalStorage("fav", JSON.stringify(favorites_Tasks));
};
export const handleAddFav = (id) => {
  CREATE_BODY.classList = "d-none";
  EDIT_BODY.className = "d-none";
  EDIT_BODYY.className = "d-block";
  EDIT_BODYY.className = "center";
  editTaskListenerss();
  const favorite_Task = favorites_Tasks.find((f) => f.id === id);
  const { description, dueDate } = favorite_Task;

  DESCRIPTION_EDIT_TASK_FIELDD.value = "";
  DESCRIPTION_EDIT_TASK_FIELDD.value = description;
  DESCRIPTION_EDIT_TASK_FIELDD.dispatchEvent(new Event("change"));
  DESCRIPTION_EDIT_TASK_FIELDD.value = "";
  DESCRIPTION_EDIT_TASK_FIELDD.value = description;
  DUE_DATE_EDIE_TASK_FIELDD.value = "";
  DUE_DATE_EDIE_TASK_FIELDD.value = dueDate.split("/").reverse().join("-");
  DUE_DATE_EDIE_TASK_FIELDD.dispatchEvent(new Event("change"));
  ad_to_favorite_sidebar.style.right = "-400px";
};

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
  let check = false;
  tasks.forEach((task) => {
    if (
      new Date(task.dueDate.split("/").reverse().join("-")).getTime() <
        new Date().getTime() ||
      task.status === "Completed"
    ) {
      check = true;
    }
  });
  if (check) {
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
  }
};
