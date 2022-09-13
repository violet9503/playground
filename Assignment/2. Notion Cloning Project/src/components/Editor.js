export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $editor.className = "content-editor";
  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
  };

  this.render = () => {
    $editor.innerHTML = `
        <div class="editor-title" contentEditable="true" name="title">${this.state.title}</div>
        <div class="editor-content" contentEditable="true" name="content">${this.state.content}</div>
      `;
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    const name = e.target.getAttribute("name");

    if (name) {
      const nextState = { ...this.state, [name]: e.target.innerHTML };

      this.setState(nextState);
      onEditing(this.state);
    }
  });
}
