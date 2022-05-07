import React from "react";
import styled from "styled-components";

const CharacterHeader = styled.h2``;
const CharacterWrapper = styled.div`
  display: grid;
  place-items: center;
`;
const Image = styled.img`
  height: auto;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

export default function CharacterContainer({ lastName, firstName, image }) {
  return (
    <CharacterWrapper>
      <CharacterHeader>
        {lastName} {firstName}
      </CharacterHeader>
      <Image src={image} />
    </CharacterWrapper>
  );
}
