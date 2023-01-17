import { onChangePage } from "./routes/router.js";
import {
  HOME_PAGE_LINK,
  ABOUT_PAGE_LINK,
  CREATE_AD_P_LINK,
  LOGIN_PAGE_LINK,
  LINK_HOME_PAGE,
  SLIDER_PREV_BTN,
  SLIDER_NEXT_BTN,
} from "./services/domService.js";
import PAGES from "./models/pageModel.js";
import { renderSlider as render } from "./services/renderSlider.js";
import { setCounter } from "./services/picService.js";
import initialData from "./initialData/initialData.js";
import Picture from "./models/pictuerModel.js";
import User from "./models/userModel.js";
//#region הגדרת משתנים גלובליים
//#region הגדרת משתנים גלובליים
let { pictures, users } = initialData();

let counter = 0;

//#endregion

// אתחול הצגה ראשונית
render(pictures);

//slider logic
const onChangeSliderPic = (controller) => {
  counter = setCounter(pictures, counter, controller);
  render(pictures, counter);
};
let s = new Picture(pictures[0], pictures);
console.log(pictures[0], pictures);
s.price = 20;
console.log(s["_id"]);
console.log(s);
let u = new User(
  {
    name: { first: "d", last: "a" },
    address: {},
    phone: "0509255955",
    email: "s@w.com",
    password: "1234aA!",
  },
  users
);
u.name = { first: "st", last: "ms" };
console.log(u);
//#region האזנה לאירועים
// ניתוב דפים
HOME_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.HOME));
ABOUT_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.ABOUT));
CREATE_AD_P_LINK.addEventListener("click", () => onChangePage(PAGES.CREATE_AD));
LOGIN_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.LOGIN));
LINK_HOME_PAGE.addEventListener("click", () => onChangePage(PAGES.HOME));

// מצגת תמונות
SLIDER_PREV_BTN.addEventListener("click", () => onChangeSliderPic("prev"));
SLIDER_NEXT_BTN.addEventListener("click", () => onChangeSliderPic("next"));

//#endregion
