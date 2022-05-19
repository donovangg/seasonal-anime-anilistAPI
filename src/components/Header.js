import React from "react";
import HeaderImg from "../assets/your-name.jpeg";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { marked } from "marked";
import { Link } from "react-router-dom";

const HeaderWrapper = styled.div`
  height: 80vh;
  background-image: url(${HeaderImg});
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  overflow-x: hidden;
`;

const HeaderOverlay = styled.div`
  height: 80vh;
  width: 100vw;
  background-color: rgba(0, 62, 119, 0.23);
  top: 0;
  left: 0;
  position: absolute;
  z-index: 1;
`;

const HeaderContent = styled.div`
  z-index: 3;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-left: 2rem;

  @media (max-width: 600px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const HeaderText = styled.h2`
  color: #fff;
  font-size: 2rem;
  margin: 0;
  padding: 0;
`;

const TitleText = styled.h1`
  color: #fff;
  font-size: 3rem;
`;

const Desc = styled.div`
  font-size: 1.15rem;
  line-height: 2;
  letter-spacing: 0.25px;
  color: #fff;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 35%;
  gap: 1rem;

  @media (max-width: 600px) {
    margin: 0 auto;
    width: 100%;
    justify-content: flex-start;
    gap: 1rem;
  }
`;

const Button = styled(Link)`
  background-color: transparent;
  color: #fff;
  border: 2px solid #fff;
  padding: 0.55rem 2rem;
  text-decoration: none;
  transition: 0.4s;

  &:hover {
    background-color: #7e22ce;
  }
`;

const ExButton = styled.a`
  background-color: #a855f7;
  color: #fff;
  border: 2px solid #fff;
  padding: 0.55rem 2rem;
  text-decoration: none;
  transition: 0.4s;

  &:hover {
    background-color: #7e22ce;
  }
`;

export default function Header() {
  const [featured, setFeatured] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  var query = `
  query ($id: Int) { # Define which variables will be used in the query (id)
    Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
      id
      title {
        romaji
        english
        native
      }
      description
    }
  }
`;

  // Define our query variables and values that will be used in the query request
  var variables = {
    id: 21519,
  };

  // Define the config we'll need for our Api request
  var url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  const fetchFeatured = async () => {
    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data);
    setFeatured(data.data.Media);
    setTitle(data.data.Media.title.english);
    setDesc(data.data.Media.description);
  };

  useState(() => {
    fetchFeatured();
  }, []);

  return (
    <HeaderWrapper>
      <HeaderOverlay />
      <HeaderContent>
        <HeaderText>Donovan's Featured</HeaderText>
        <TitleText>{title}</TitleText>
        <Desc dangerouslySetInnerHTML={{ __html: desc }} />
        <ButtonContainer>
          <Button to={`/anime/21519`}>Info</Button>
          <ExButton
            target="_blank"
            href="https://www.justwatch.com/us/movie/your-name"
          >
            Watch
          </ExButton>
        </ButtonContainer>
      </HeaderContent>
    </HeaderWrapper>
  );
}
