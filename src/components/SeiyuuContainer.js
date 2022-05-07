import React from "react";
import styled from "styled-components";

const SeiyuuHeader = styled.h2``;
const SeiyuuWrapper = styled.div`
  display: grid;
  place-items: center;
`;

const Image = styled.img`
  height: auto;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

export default function SeiyuuContainer({ firstName, lastName, image }) {
  return (
    <SeiyuuWrapper>
      <SeiyuuHeader>
        {lastName} {firstName}
      </SeiyuuHeader>
      <Image src={image} />
    </SeiyuuWrapper>
  );
}
