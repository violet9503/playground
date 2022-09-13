import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";

const TagWrapper = styled.div`
  display: flex;
  width: 35%;
  border-radius: 5px;
  align-items: center;
  padding: 10px;
  flex-wrap: wrap;
  border: 1px solid #ddd;
  box-sizing: border-box;

  ${({ focus }) =>
    focus &&
    css`
      border: 1px solid #6741d9;
    `}
`;

const TagBlock = styled.div`
  color: white;
  display: flex;
  border-radius: 5px;
  padding: 5px;
  align-items: center;
  justify-content: center;
  background-color: #6741d9;
  margin-right: 5px;
  font-size: 0.9em;
  & div {
    width: 1em;
    height: 1em;
    border-radius: 1em;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6741d9;
    cursor: pointer;
    margin-left: 3px;
    box-sizing: border-box;
  }
`;

const TagInput = styled.input`
  outline: none;
  border: 0;
  display: flex;
  box-sizing: border-box;
  height: 30px;
  cursor: default;
`;

function Tag() {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const tagId = useRef(1);

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmitTag = (e) => {
    const key = e.key || e.keyCode;
    if (key === "Enter" || key === 13) {
      if (e.nativeEvent.isComposing) return;
      setTags((prevTag) =>
        prevTag.concat({
          id: tagId.current,
          content: input,
        })
      );
      tagId.current++;
      setInput("");
    }
  };

  const onDelete = (id) => {
    setTags((prevTag) => prevTag.filter((tag) => tag.id !== id));
  };

  const onFocus = (flag) => {
    setInputFocused(flag);
  };

  return (
    <TagWrapper focus={inputFocused}>
      {tags.map((tag) => (
        <TagBlock key={tag.id}>
          {tag.content}
          <div onClick={() => onDelete(tag.id)}>x</div>
        </TagBlock>
      ))}
      <TagInput
        placeholder="Press enter to add tags"
        value={input}
        onChange={onChange}
        onKeyDown={onSubmitTag}
        onFocus={() => onFocus(true)}
        onBlur={() => onFocus(false)}
      />
    </TagWrapper>
  );
}

export default Tag;
