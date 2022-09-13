import styled from "@emotion/styled";
import { FormatInput } from "./components/FormatInput";
import { Header } from "./components/Header";

const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > * {
    margin: 20px 0;
  }
`;

function App() {
  return (
    <div className="App">
      <ComponentContainer>
        <Header>Formatting Input</Header>
        <FormatInput
          type="custom"
          prefix="PREFIX "
          blocks={[3, 3, 3, 2]}
          delimiters={["-", "-", "."]}
        />

        <FormatInput type="custom" prefix="PREFIX-" blocks={[1, 2, 3, 1]} delimiter="-" />

        <FormatInput type="custom" numericOnly placeholder="Number Only" />

        <FormatInput type="custom" uppercase placeholder="Uppercase" />

        <FormatInput
          type="custom"
          numericOnly
          blocks={[0, 3, 0, 4, 4]}
          delimiters={["(", ")", "-"]}
          placeholder="Blocks with 0, delimiters"
        />

        <FormatInput type="phone" typeOption="home" placeholder="Home Phone" />

        <FormatInput type="creditCard" placeholder="Credit Card" />

        <FormatInput type="date" placeholder="Date YYYY/MM/DD" />

        <FormatInput
          type="date"
          typeOption={["y", "m", "d"]}
          delimiter="-"
          placeholder="Date yy-mm-dd"
        />
        <FormatInput type="thousand" placeholder="Thousand" />
        <FormatInput type="thousand" typeOption="wan" placeholder="Wan" />
      </ComponentContainer>
    </div>
  );
}

export default App;
