import React from "react";
import HeaderImg from "../assets/placeholder-header.jpg";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  height: 80vh;
  background-image: url(${HeaderImg});
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  overflow-x: hidden;
`;

const HeaderOverlay = styled.div`
  height: 80vh;
  width: 100vw;
  background-color: rgba(0, 62, 119, 0.69);
  top: 0;
  left: 0;
  position: absolute;
  z-index: 1;
`;

const HeaderContent = styled.div`
  z-index: 3;
  position: relative;
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
