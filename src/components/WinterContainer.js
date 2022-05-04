import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AnimeWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 1rem;
  padding: 1rem;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #007bef;
    border-radius: 10px;
    box-shadow: inset 2px 2px 2px hsla(0, 0%, 100%, 0.25),
      inset -2px -2px 2px rgba(0, 0, 0, 0.25);
  }
`;

const HeaderText = styled.h2`
  font-size: 2rem;
  position: relative;
  max-width: 600px;
  background-image: linear-gradient(#007bef, #8964cd);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
`;

const CardLink = styled(Link)`
  position: relative;
`;

export default function WinterContainer() {
  const [winterAnime, setWinterAnime] = useState([]);

  var query = `
    query ($page: Int, $perPage: Int, $search: String) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            perPage
          }
          media(search: $search, type: ANIME, sort: POPULARITY_DESC, season: WINTER, seasonYear: 2022, ) {
            id
            coverImage {
              extraLarge
              large
              medium
              color
            }
            title {
              romaji
              english
              native
              
            }
            streamingEpisodes {
              title
              thumbnail
              url
              site
            }
            type
            genres
            description
          }
        }
      }
  `;

  // Define our query variables and values that will be used in the query request
  var variables = {
    perPage: 20,
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

  const fetchFall = async () => {
    const res = await fetch(url, options);
    const data = await res.json();

    console.log(data.data.Page.media);
    setWinterAnime(data.data.Page.media);
  };

  useState(() => {
    fetchFall();
  }, []);

  return (
    <>
      <HeaderText>Winter</HeaderText>
      <AnimeWrapper>
        {winterAnime.map((ani) => (
          <CardLink key={ani.id} to={`/anime/${ani.id}`}>
            <Card
              title={ani.title.english}
              imgSrc={ani.coverImage.extraLarge}
              genres={ani.genres}
              key={ani.id}
            />
          </CardLink>
        ))}
      </AnimeWrapper>
    </>
  );
}
