import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  min-width: 15rem;
  border: 2px solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardHeader = styled.div`
  border: 2px solid green;
`;

const CardImageWrapper = styled.div`
  border: 2px solid green;
  display: relative;
  width: 100%;
  height: 100%;
`;

const CardImage = styled.img`
  height: 100%;
  width: 100%;
`;
export default function Card({ title, imgSrc, genres, key }) {
  return (
    <CardWrapper key={key}>
      <CardImageWrapper>
        <CardImage src={imgSrc} alt={title} />
      </CardImageWrapper>
    </CardWrapper>
  );
}
