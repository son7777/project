import { TASK_LIST, EMPTY_TASK_LIST, TABLE } from "../services/domService.js";
export const renderTable = (tasks) => {
  if (tasks.length) {
    EMPTY_TASK_LIST.className = "d-none";
    TABLE.className = "d-block table-responsive";
    TASK_LIST.innerHTML = "";
    tasks.forEach((task, index) => {
      const { id, description, dueDate, status } = task;
      if (status === "Completed") {
        TASK_LIST.innerHTML += `
        <tr class="fs-5 progress-bar-striped bg-success" id="${id}">
            <td>${index + 1}</td>  
            <td>${description}</td>
            <td >${dueDate}</td>
            <td  ><input type="checkbox"  name="complite" checked id="checkbox${id}" style="cursor:pointer; transform: scale(1.8); margin-top:12px; margin-left:18px;  " /></td>
            <td><i class="bi bi-pencil-square cursor fs-4 " id="edit${id}" ></i></td>
            <td><i class="bi bi-trash3-fill cursor fs-4 mb-3" id="delete${id}" style="margin-left:13px; "></i></td>
             <td><img style="width:30px; cursor:pointer; " src="../public/assets/images/add-heart.png" alt="add-to-favorite" id="addTF${id}"  /></td>
        </tr>
        `;
      } else if (status === "Uncompleted") {
        if (
          new Date(dueDate.split("/").reverse().join("-")).getTime() <
          new Date().getTime()
        ) {
          TASK_LIST.innerHTML += `
        <tr class="fs-5 progress-bar-striped bg-danger" style="background-size:55%;" id="${id}" >
            <td >${index + 1}</td>  
            <td "> ${description}</td>
            <td >${dueDate}</td>
            
            <td ><input type="checkbox" name="checkbox" id="checkbox${id}" style="cursor:pointer;  transform: scale(1.8);  margin-top:12px;margin-left:18px;  " /></td>
            <td ><i  class="bi bi-pencil-square cursor fs-4" id="edit${id}"></i></td>
            <td><i  class="bi bi-trash3-fill cursor fs-4 mb-3" id="delete${id}" " style="margin-left:13px; "></i></td>
            <td><img style="width:30px;  cursor:pointer;" src="../public/assets/images/add-heart.png" alt="add-to-favorite"  id="addTF${id}"  /></td>
        </tr>
        `;
        } else {
          TASK_LIST.innerHTML += `
        <tr class="fs-5  progress-bar-striped progress-bar-animated " style="background-size:55%;" id="${id}" >
            <td >${index + 1}</td>  
            <td "> ${description}</td>
            <td  class="hivhuv">${dueDate}</td>
            
            <td ><input type="checkbox"  name="uncomplitT" id="checkbox${id}" style="cursor:pointer;  transform: scale(1.8);  margin-top:12px;margin-left:18px;  " /></td>
            <td ><i  class="bi bi-pencil-square cursor fs-4" id="edit${id}"></i></td>
            <td><i  class="bi bi-trash3-fill cursor fs-4 mb-3" id="delete${id}" " style="margin-left:13px; "></i></td>
            <td><img style="width:30px;  cursor:pointer;" src="../public/assets/images/add-heart.png" alt="add-to-favorite"  id="addTF${id}"  /></td>
        </tr>
        `;
        }
      }
    });
  } else {
    EMPTY_TASK_LIST.className = "d-block";
    TABLE.className = "d-none";
  }
};

export default renderTable;
