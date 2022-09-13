import React, { useState } from "react";
import styled, { css } from "styled-components";

const TabWrapper = styled.div`
  display: flex;
  width: 45%;
  height: 300px;
  border-radius: 20px;
  box-sizing: border-box;
  flex-direction : column;
}
`;

const TabHeaderBlock = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
  background-color: #ddd;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  ::before {
    content: "";
    width: 30px;
  }

  div {
    width: ${(props) => 100 / props.count}%;
  }
`;

const TabHeader = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  cursor: pointer;

  ${({ selected }) =>
    selected &&
    css`
      background-color: #6741d9;
      color: white;
    `}
`;

const TabContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

function Tab() {
  const tabContents = [
    { id: 1, content: "ONE" },
    { id: 2, content: "TWO" },
    { id: 3, content: "THREE" },
  ];

  const [content, setContent] = useState(tabContents[0]);

  const onClickTab = (id) => {
    const selectedTab = tabContents.filter((tab) => tab.id === id);
    setContent(selectedTab[0]);
  };

  return (
    <TabWrapper>
      <TabHeaderBlock count={tabContents.length}>
        {tabContents.map((tab) => (
          <TabHeader
            selected={tab.id === content.id}
            key={tab.id}
            onClick={() => onClickTab(tab.id)}
          >
            Tab{tab.id}
          </TabHeader>
        ))}
      </TabHeaderBlock>
      <TabContent>Tab menu {content.content}</TabContent>
    </TabWrapper>
  );
}

export default Tab;
