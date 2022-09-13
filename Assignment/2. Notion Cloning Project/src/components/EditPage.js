import Editor from "./Editor.js";
import { updateDocument } from "../utils/api.js";
import { changeTitle } from "../utils/common.js";

export default function EditPage({ $target, initialState }) {
  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
  };

  let timer = null;

  new Editor({
    $target,
    initialState: {
      title: this.state.currentPageData.title,
      content: this.state.currentPageData.content || "",
    },
    onEditing: page => {
      changeTitle(page.title);

      if (timer !== null) clearTimeout(timer);

      timer = setTimeout(async () => {
        await updateDocument(this.state.pageId, page);
      }, 1000);
    },
  });
}
