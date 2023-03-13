const initialData = () => {
  const data = {
    pictures: [
      {
        url: "../public/assets/images/taskManager.png",
        alt: "TASK-MANAGER",
        credit: "TASK MANAGER",
      },
      {
        url: "https://cdn.pixabay.com/photo/2021/12/21/08/29/owl-6884773_960_720.jpg",
        alt: "owl",
        credit: "Jessica Rabbit",
      },
      {
        url: "https://cdn.pixabay.com/photo/2022/02/26/07/06/butterfly-7035308_960_720.jpg",
        alt: "butterfly",
        credit: "Tyra Banks",
      },
    ],
  };
  const pictures = data.pictures;
  return { pictures };
};

export default initialData;
