import React, { useState } from "react";
import styled, { css } from "styled-components";

const EditWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & + & {
    margin-top: 15px;
  }
`;

const EditInput = styled.input`
  width: 130px;
  border-radius: 15px;
  border: 1px solid #eee;
  padding: 10px;
  margin-left: 10px;
  text-align: center;

  :disabled {
    background-color: white;
  }
`;

function ClickToEdit() {
  const [inputs, setInputs] = useState({ username: "홍길동", age: "20" });

  const onChange = (e) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <EditWrapper>
        이름
        <EditInput
          name="username"
          defaultValue={inputs.username}
          onBlur={onChange}
        />
      </EditWrapper>
      <EditWrapper>
        나이
        <EditInput name="age" defaultValue={inputs.age} onBlur={onChange} />
      </EditWrapper>
      <EditWrapper>
        이름 {inputs.username} 나이 {inputs.age}
      </EditWrapper>
    </>
  );
}

export default ClickToEdit;
