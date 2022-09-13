import "./App.css";
import Toggle from "./component/Toggle";
import Modal from "./component/Modal";
import Tab from "./component/Tab";
import Tag from "./component/Tag";
import Animate from "./Animate";
import styled from "styled-components";
import AutoComplete from "./component/AutoComplete";
import ClickToEdit from "./component/ClickToEdit";

const ComponentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  & + & {
    margin-top: 60px;
  }
`;

function App() {
  return (
    <div className="App">
      <ComponentWrapper>
        <Toggle />
      </ComponentWrapper>
      <ComponentWrapper>
        <Modal />
      </ComponentWrapper>
      <ComponentWrapper>
        <Tab />
      </ComponentWrapper>
      <ComponentWrapper>
        <Tag />
      </ComponentWrapper>
      <ComponentWrapper>
        <AutoComplete />
      </ComponentWrapper>
      <ComponentWrapper>
        <ClickToEdit />
      </ComponentWrapper>
      <ComponentWrapper></ComponentWrapper>
      {/* <Animate /> */}
    </div>
  );
}

export default App;
