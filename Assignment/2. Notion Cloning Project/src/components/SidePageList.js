import SidePage from "./SidePage.js";

export default function SidePageList({ $target, initialState, onStateChange }) {
  const $sidePageList = document.createElement("div");
  $sidePageList.className = "sidebar-pagelist";
  $target.appendChild($sidePageList);

  this.onStateChange = onStateChange;

  this.state = initialState;

  this.setState = (nextState, renderOption = true) => {
    if (this.state === nextState) return;
    this.state = nextState;

    if (renderOption) sidePage.setState({ parentId: null, documents: this.state, isToggled: true });
  };

  this.render = () => {
    $sidePageList.innerHTML = `
        <div class="sidebar-pagelist-header">페이지 목록</div>
    `;
  };

  this.render();

  const sidePage = new SidePage({
    $target: $sidePageList,
    initialState: { parentId: null, documents: this.state, isToggled: true },
    onStateChange: ({ documents }, childDocuments) => {
      this.setState(documents, false);
      this.onStateChange(this.state, childDocuments);
    },
  });
}
