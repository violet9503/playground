import React, { useState } from "react";
import styled, { css } from "styled-components";

const AutoCompleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-sizing: border-box;
`;

const AutoCompleteInput = styled.input`
  height: 20px;
  border: 0;
  outline: none;
  font-size: 1em;
  margin: 10px;
`;

const AutoCompleteList = styled.div`
  width: 100%;
  max-height: 100px;
  box-sizing: border-box;

  ${({ count }) =>
    count &&
    css`
      border-top: 1px solid #ddd;
      padding: 5px 0;
    `}

  & div {
    padding: 0 10px;
  }

  & div:hover {
    background-color: #eee;
  }
`;

function AutoComplete() {
  const history = [
    { id: 1, content: "auto" },
    { id: 2, content: "autoComplete" },
    { id: 3, content: "vintage" },
    { id: 4, content: "modal" },
    { id: 5, content: "refurbished" },
    { id: 6, content: "rustic" },
  ];
  const [lists, setlists] = useState([]);
  const [inputs, setInputs] = useState("");

  const onChange = (e) => {
    const inputValue = e.target.value;
    setInputs(inputValue);

    if (inputValue.length > 0)
      setlists(history.filter((h) => h.content.includes(inputValue)));
    else setlists([]);
  };

  const onClick = (content) => {
    setInputs(content);
    setlists(history.filter((h) => h.content.includes(content)));
  };

  return (
    <AutoCompleteWrapper>
      <AutoCompleteInput onChange={onChange} value={inputs} />
      <AutoCompleteList count={lists.length}>
        {lists.map((list) => (
          <div key={list.id} onClick={() => onClick(list.content)}>
            {list.content}
          </div>
        ))}
      </AutoCompleteList>
    </AutoCompleteWrapper>
  );
}

export default AutoComplete;
