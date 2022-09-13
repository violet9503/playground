import { observable } from "./observer.js";

let currentSelectedPage = null;

export const setStore = nextState => {
  for (const [key, value] of Object.entries(nextState)) {
    if (key in store) store[key] = value;
  }
};

export const store = observable({
  pageId: null,
});

export const selectPage = $target => {
  if (currentSelectedPage) {
    currentSelectedPage.classList.remove("selected");
  }

  $target.classList.add("selected");
  currentSelectedPage = $target;
};

export const changeTitle = title => {
  const $title = currentSelectedPage.querySelector(".sidebar-page-title");
  $title.innerHTML = `${title || "제목 없음"}`;
};
