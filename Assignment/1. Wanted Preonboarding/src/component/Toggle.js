import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";

const ToggleBlock = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  border-radius: 20px;
  background-color: #bbb;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 10px;
  box-sizing: border-box;
  height: 2em;

  ::before {
    content: "";
    display: flex;
    height: 2em;
    width: 15px;
    opacity: 0;
    border-radius: 20px;
    background-color: #6741d9;
    position: absolute;
    box-sizing: border-box;
    transition: all 0.3s;
  }

  ::after {
    content: "";
    display: flex;
    border-radius: 1.5em;
    width: 1.5em;
    height: 1.5em;
    margin: 5px;
    background-color: white;
    transition: transform 0.3s ease-in-out;
  }

  ${({ toggle }) =>
    toggle &&
    css`
      ::before {
        opacity: 1;
        width: 80px;
      }
      ::after {
        transform: translateX(45px);
      }
    `}
`;

function Toggle() {
  const [toggle, setToggle] = useState(false);

  const onToggle = () => {
    setToggle((toggle) => !toggle);
  };

  return (
    <>
      <ToggleBlock onClick={onToggle} toggle={toggle} />
      <div>Toggle Switch {toggle ? "ON" : "OFF"}</div>
    </>
  );
}

export default Toggle;
