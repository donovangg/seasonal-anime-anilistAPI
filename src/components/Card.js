import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  min-width: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const CardHeader = styled.div`
  border: 2px solid green;
`;

const CardImageWrapper = styled.div`
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
