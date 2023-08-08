const initialData = () => {
  const data = {
    pictures: [
      {
        url: "../public/assets/images/taskManager.png",
        alt: "TASK-MANAGER",
        credit: "TASK MANAGER",
      },
      {
        url: "../public/assets/images/popup.png",
        alt: "popup",
        credit: "POPUP",
      },
      {
        url: "../public/assets/images/favorites.png",
        alt: "favorites",
        credit: "FAVORITES",
      },
    ],
  };
  const pictures = data.pictures;
  return { pictures };
};

export default initialData;
