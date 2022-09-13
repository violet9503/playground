import { routeChange, routeReplace } from "../utils/router.js";
import { createDocument, deleteDocument } from "../utils/api.js";
import { selectPage, store } from "../utils/common.js";
import { observe } from "../utils/observer.js";

export default function SidePage({ $target, initialState, onStateChange }) {
  const $sidePage = document.createElement("div");

  $target.appendChild($sidePage);

  this.state = initialState;

  this.setState = (nextState, renderOption = true) => {
    this.state = nextState;
    if (renderOption) this.render();
  };

  this.onStateChange = onStateChange;

  let childPageList = {};

  this.render = () => {
    $sidePage.innerHTML = ``;

    if (this.state.isToggled) {
      this.state.documents.forEach(page => {
        const $eachChildPage = document.createElement("div");
        $eachChildPage.className = "sidebar-page-container";
        $eachChildPage.innerHTML = sidePageTemplate(page);
        $sidePage.appendChild($eachChildPage);

        observe(() => {
          if (store.pageId === page.id) selectPage($eachChildPage.querySelector(".sidebar-page"));
        });

        if (page.documents && page.documents.length > 0) {
          const tempChild = new SidePage({
            $target: $eachChildPage,
            initialState: {
              parentId: page.id,
              documents: page.documents,
              isToggled: page.isToggled,
            },
            onStateChange: (childState, childDocuments) => {
              const nextStateDocuments = this.state.documents.map(page =>
                page.id === childState.parentId
                  ? { ...page, documents: childState.documents, isToggled: childState.isToggled }
                  : page
              );
              this.setState({ ...this.state, documents: nextStateDocuments }, false);
              this.onStateChange(this.state, childDocuments);
            },
          });

          childPageList[page.id] = tempChild;
        }
      });
    }
  };

  const sidePageTemplate = page => {
    return `<div class="sidebar-page" data-id="${page.id}">
                <div>
                    <span class="sidebar-page-toggle-btn">▶︎ </span>
                    <span class="sidebar-page-title">${page.title || "제목 없음"}</span>
                </div>
                <div>
                    <button class="sidebar-page-create-btn">+</button> 
                    <button class="sidebar-page-remove-btn">X</button>
                </div>
            </div>`;
  };

  this.render();

  this.onToggle = () => {
    const nextState = { ...this.state, isToggled: !this.state.isToggled };
    this.setState(nextState);
    this.onStateChange(this.state);
  };

  $sidePage.addEventListener("click", async e => {
    e.stopPropagation();
    const $pageBlock = e.target.closest(".sidebar-page");
    if (!$pageBlock) {
      return;
    }

    const pageId = parseInt($pageBlock.dataset["id"]);
    const { className } = e.target;
    if (className === "sidebar-page-create-btn") {
      const createdPage = await createDocument(pageId);
      routeChange(`/documents/${createdPage.id}`);

      const nextStateDocuments = this.state.documents.map(page =>
        page.id === pageId
          ? { ...page, documents: page.documents.concat({ ...createdPage, documents: [] }) }
          : page
      );
      this.setState({ ...this.state, documents: nextStateDocuments });
      this.onStateChange(this.state);
    } else if (className === "sidebar-page-remove-btn") {
      await deleteDocument(pageId);
      if (store.pageId === pageId) routeReplace("/");

      const nextStateDocuments = this.state.documents.filter(page => page.id !== pageId);
      const childDocuments = this.state.documents.filter(page => page.id === pageId)[0].documents;

      this.setState({ ...this.state, documents: nextStateDocuments });
      this.onStateChange(this.state, childDocuments);
    } else if (className === "sidebar-page-toggle-btn") {
      if (pageId in childPageList) childPageList[pageId].onToggle();
    } else {
      routeChange(`/documents/${pageId}`);
    }
  });
}
