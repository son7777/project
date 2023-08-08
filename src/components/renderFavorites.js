import { addToFavoriteBody } from "../services/domService.js";
import { favdel, handleAddFav } from "../app.js";
export const renderFavorites = (favorites) => {
  addToFavoriteBody.innerHTML = "";
  const ul = document.createElement("ul");
  const div = document.createElement("div");
  ul.style.width = "100%";
  div.className = "center";
  div.style.width = "100%";
  div.style.marginRight = "25px";
  div.appendChild(ul);
  addToFavoriteBody.appendChild(div);
  favorites.forEach((f) => {
    const { description, id } = f;
    const li = document.createElement("li");
    const span = document.createElement("span");
    const spann = document.createElement("span");
    span.textContent = description;
    const qu = document.createElement("quote");
    const x = " ❌ ";
    qu.id = `${id}delete`;
    qu.append(x);
    const qut = document.createElement("quote");
    const y = " ➕ ";
    qut.append(y);
    qut.id = `${id}add`;
    spann.appendChild(qu);
    spann.appendChild(qut);
    li.appendChild(span);
    li.appendChild(spann);
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.padding = "10px 0";
    li.style.borderBottom = "1px solid white";
    li.style.color = "white";
    li.style.listStyle = "none";
    li.style.width = "100%";
    li.style.marginBottom = "5px";
    li.style.fontSize = "18px";
    console.log(id);
    ul.appendChild(li);
    qu.addEventListener("mouseover", () => {
      qu.classList.add("dangerrr");
    });
    qu.addEventListener("mouseleave", () => {
      qu.classList.remove("dangerrr");
    });
    qu.addEventListener("click", () => {
      addEventOnDeleteFav(id);
    });
    qut.addEventListener("click", () => {
      addOnF(id);
    });
    qut.addEventListener("mouseover", () => {
      qut.classList.add("addd");
    });
    qut.addEventListener("mouseleave", () => {
      qut.classList.remove("addd");
    });
  });
};
const addEventOnDeleteFav = (id) => {
  favdel(id);
};
const addOnF = (id, favorites) => {
  handleAddFav(id, favorites);
};
