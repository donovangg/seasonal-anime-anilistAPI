import React from "react";
import HeaderImg from "../assets/your-name.jpeg";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { marked } from "marked";

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
  border: 2px solid red;
  width: 50%;
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
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
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
      </HeaderContent>
    </HeaderWrapper>
  );
}
