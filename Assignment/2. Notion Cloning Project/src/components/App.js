import SidebarContainer from "./SidebarContainer.js";
import ContentContainer from "./ContentContainer.js";
import { initRouter } from "../utils/router.js";
import { setStore } from "../utils/common.js";

export default function App({ $target }) {
  const $app = document.createElement("div");
  $app.className = "app";
  $target.appendChild($app);

  const sidebarContainer = new SidebarContainer({
    $target: $app,
    initialState: [],
  });

  const contentContainer = new ContentContainer({
    $target: $app,
    initialState: { pageId: null },
  });

  this.route = () => {
    const { pathname } = location;

    if (pathname === "/") {
      contentContainer.setState({ pageId: null });
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , pageId] = pathname.split("/").map(str => parseInt(str));
      contentContainer.setState({ pageId });
      setStore({ pageId });
    } else {
      contentContainer.setState({ pageId: "notfound" });
    }
  };

  this.route();

  initRouter(() => this.route());
}
