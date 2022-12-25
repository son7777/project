import {
  HOME_PAGE,
  ABOUT_PAGE,
  CREATE_AD_PAGE,
  LOGIN_PAGE,
  ERROR_404_PAGE,
} from "../services/domService.js";
import PAGES from "../models/pageModel.js";
export const onChangePage = (page) => {
  HOME_PAGE.className = "d-none";
  ABOUT_PAGE.className = "d-none";
  CREATE_AD_PAGE.className = "d-none";
  LOGIN_PAGE.className = "d-none";
  ERROR_404_PAGE.className = "d-none";
  switch (page) {
    case PAGES.HOME:
      HOME_PAGE.className = "d-block";
      break;
    case PAGES.ABOUT:
      ABOUT_PAGE.className = "d-block";
      break;
    case PAGES.CREATE_AD:
      CREATE_AD_PAGE.className = "d-block";
      break;
    case PAGES.LOGIN:
      LOGIN_PAGE.className = "d-block";
      break;
    default:
      ERROR_404_PAGE.classList = "d-block";
      break;
  }
};
