export default function SideNewPage({ $target, onNewClick }) {
  const $sideNewPage = document.createElement("div");
  $sideNewPage.className = "sidebar-newpage-container";
  $target.appendChild($sideNewPage);

  this.render = () => {
    $sideNewPage.innerHTML = `+ 새 페이지`;
  };

  this.render();

  $sideNewPage.addEventListener("click", () => {
    onNewClick();
  });
}
