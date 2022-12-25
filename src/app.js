import { onChangePage } from "./routes/router.js";
import {
  HOME_PAGE_LINK,
  ABOUT_PAGE_LINK,
  CREATE_AD_P_LINK,
  LOGIN_PAGE_LINK,
  LINK_HOME_PAGE,
} from "./services/domService.js";
import PAGES from "./models/pageModel.js";

//#region האזנה לאירועים
// ניתוב דפים
HOME_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.HOME));
ABOUT_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.ABOUT));
CREATE_AD_P_LINK.addEventListener("click", () => onChangePage(PAGES.CREATE_AD));
LOGIN_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.LOGIN));
LINK_HOME_PAGE.addEventListener("click", () => onChangePage(PAGES.HOME));

//#endregion
