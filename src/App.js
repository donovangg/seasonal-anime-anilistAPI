import { useEffect, useState } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import styled from "styled-components";
import TrendingContainer from "./components/TrendingContainer";
import WinterContainer from "./components/WinterContainer";
import SpringContainer from "./components/SpringContainer";
import SummerContainer from "./components/SummerContainer";
import { Link } from "react-router-dom";

const AnimeWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  background-color: #fff;
`;

function App() {
  return (
    <div className="App">
      <Header />
      <AnimeWrapper>
        <TrendingContainer />
        <WinterContainer />
        <SpringContainer />
        <SummerContainer />
      </AnimeWrapper>
    </div>
  );
}

export default App;
