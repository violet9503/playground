import SideNewPage from "./SideNewPage.js";
import SidePageList from "./SidePageList.js";
import { getDocuments, createDocument } from "../utils/api.js";
import { routeChange } from "../utils/router.js";

export default function SidebarContainer({ $target, initialState }) {
  const $sidebarContainer = document.createElement("div");
  $sidebarContainer.className = "sidebar-container";
  $target.appendChild($sidebarContainer);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    sidePageList.setState(this.state);
  };

  const sidePageList = new SidePageList({
    $target: $sidebarContainer,
    initialState: this.state,
    onStateChange: (nextState, childDocuments = []) => {
      if (childDocuments.length !== 0) this.setState(nextState.concat(childDocuments));
      else this.setState(nextState);
    },
  });

  new SideNewPage({
    $target: $sidebarContainer,
    onNewClick: async () => {
      const createdPage = await createDocument(null);
      const nextState = this.state.concat({ ...createdPage, documents: [] });
      this.setState(nextState);

      routeChange(`/documents/${createdPage.id}`);
    },
  });

  this.init = async () => {
    const pageListData = await getDocuments();
    this.setState(pageListData);
  };

  this.init();
}
