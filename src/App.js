import { useEffect, useState } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import styled from "styled-components";
import TrendingContainer from "./components/TrendingContainer";
import WinterContainer from "./components/WinterContainer";
import SpringContainer from "./components/SpringContainer";
import SummerContainer from "./components/SummerContainer";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <TrendingContainer />
        <WinterContainer />
        <SpringContainer />
        <SummerContainer />
      </div>
    </div>
  );
}

export default App;
