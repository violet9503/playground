import EditPage from "./EditPage.js";
import ChildDocsList from "./ChildDocsList.js";
import { getDocument } from "../utils/api.js";
import { routeReplace } from "../utils/router.js";

export default function ContentContainer({ $target, initialState }) {
  const $contentContainer = document.createElement("div");
  $contentContainer.className = "content-container";
  $target.appendChild($contentContainer);

  this.state = initialState;

  this.setState = async nextState => {
    if (this.state.pageId !== nextState.pageId && Number.isInteger(nextState.pageId)) {
      this.state = nextState;

      await loadPageData();

      return;
    }

    this.state = nextState;

    this.render();
  };

  this.render = () => {
    $contentContainer.innerHTML = "";
    if (Number.isInteger(this.state.pageId)) {
      new EditPage({
        $target: $contentContainer,
        initialState: this.state,
      });

      new ChildDocsList({
        $target: $contentContainer,
        initialState: this.state.currentPageData.documents,
      });
    }

    if (this.state.pageId === "notfound") {
      $contentContainer.innerHTML = "<h1>현재 주소는 존재하지 않는 페이지입니다.</h1>";
    }
  };

  const loadPageData = async () => {
    try {
      const currentPageData = await getDocument(this.state.pageId);
      const nextState = { ...this.state, currentPageData };
      this.setState(nextState);
    } catch (err) {
      if (err.message === "404") {
        routeReplace("/notfound");
        return;
      }

      alert("예상치 못한 API 호출 오류");
      console.log(err.message);
    }
  };
}
