import React from "react";
import styled from "styled-components";
import TSR from "./assets/imgs/TSR.svg";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const H1 = styled.h1`
  color: #2a4365;
  font-family: Arial, Helvetica, sans-serif;
`;

function App() {
  return (
    <Container>
      <H1>The Typescript React Template</H1>
      <img src={TSR} alt="Logo" />
    </Container>
  );
}

export default App;
