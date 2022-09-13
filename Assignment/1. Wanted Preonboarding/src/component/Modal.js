import React, { useState } from "react";
import styled, { css } from "styled-components";

const ModalBlock = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: none;
  align-items: center;
  justify-content: center;

  ${({ modal }) =>
    modal &&
    css`
      display: flex;
    `}
`;

const ModalDialog = styled.div`
  background-color: white;
  width: 300px;
  height: 100px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;

  & .cancel-button {
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      cursor: pointer;
    }
  }

  & .modal-messege {
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6741d9;
    font-weight: 700;
  }
`;

const ModalButton = styled.div`
  width: 120px;
  height: 50px;
  border-radius: 20px;
  background-color: #6741d9;
  color: white;
  display: flex;
  box-sizing: border-box;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;

function Modal() {
  const [modal, setModal] = useState(false);

  const onModal = () => {
    setModal((prevState) => !prevState);
  };

  return (
    <>
      <ModalBlock modal={modal}>
        <ModalDialog>
          <div className="cancel-button">
            <span onClick={onModal}>x</span>
          </div>
          <div className="modal-messege">HELLO MODAL</div>
        </ModalDialog>
      </ModalBlock>
      <ModalButton onClick={onModal}>Open Modal</ModalButton>
    </>
  );
}

export default Modal;
