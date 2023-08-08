import { SLIDER_CREDITS, SLIDER_IMAGE } from "./domService.js";

// rendering
export const renderSlider = (pictures, num = 0) => {
  if (!pictures?.length) return null;

  const pic = pictures[num];
  const { url, alt, credit } = pic;

  SLIDER_IMAGE.src = url;
  SLIDER_IMAGE.alt = alt;
  SLIDER_CREDITS.textContent = credit;

  return;
};
