import React from "react";
import HeaderImg from "../assets/placeholder-header.jpg";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  height: 80vh;
  background-image: url(${HeaderImg});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const HeaderOverlay = styled.div`
  height: 80vh;
  width: 100vw;
  background-color: aqua;
  top: 0;
  left: 0;
  opacity: 0.45;
  position: absolute;
`;

const HeaderContent = styled.div`
  display: grid;
  place-items: center;
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <HeaderOverlay />
      <HeaderContent>
        <h1>This is the header</h1>
        <p>This has like featured stuff and shit</p>
      </HeaderContent>
    </HeaderWrapper>
  );
}
