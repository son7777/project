import {
  HOME_PAGE,
  TASKM_PAGE,
  ERROR_404_PAGE,
  APP_LINK,
} from "../services/domService.js";
import PAGES from "../models/pageModel.js";
export const onChangePage = (page) => {
  HOME_PAGE.className = "d-none";
  TASKM_PAGE.className = "d-none";
  ERROR_404_PAGE.className = "d-none";
  APP_LINK.className = "d-none";
  switch (page) {
    case PAGES.HOME:
      HOME_PAGE.className = "d-block";
      APP_LINK.className = "d-none";
      break;
    case PAGES.TASKM:
      TASKM_PAGE.className = "d-block";
      APP_LINK.className = "navbar-nav";
      break;
    default:
      ERROR_404_PAGE.classList = "d-block";
      break;
  }
};
