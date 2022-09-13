import { routeChange } from "../utils/router.js";

export default function ChildDocsList({ $target, initialState }) {
  const $docsList = document.createElement("div");
  $docsList.className = "content-documents-list";
  $target.appendChild($docsList);

  this.state = initialState;

  this.render = () => {
    $docsList.innerHTML = `
            ${this.state
              .map(page => `<div data-id=${page.id}>${page.title || "제목 없음"}</div>`)
              .join("")}
        `;
  };

  this.render();

  $docsList.addEventListener("click", e => {
    const { target } = e;

    if (target) {
      const pageId = target.dataset["id"];

      routeChange(`/documents/${pageId}`);
    }
  });
}
