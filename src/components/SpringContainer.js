import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";
import styled from "styled-components";

const AnimeWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 1rem;
`;

export default function SpringContainer() {
  const [springAnime, setSpringAnime] = useState([]);

  var query = `
      query ($page: Int, $perPage: Int, $search: String) {
          Page(page: $page, perPage: $perPage) {
            pageInfo {
              total
              perPage
            }
            media(search: $search, type: ANIME, sort: POPULARITY_DESC, season: SPRING, seasonYear: 2022, ) {
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

  const fetchSpring = async () => {
    const res = await fetch(url, options);
    const data = await res.json();

    console.log(data.data.Page.media);
    setSpringAnime(data.data.Page.media);
  };

  useState(() => {
    fetchSpring();
  }, []);
  return (
    <>
      <h2>Spring</h2>
      <AnimeWrapper>
        {springAnime.map((ani) => (
          <Card
            title={ani.title.english}
            imgSrc={ani.coverImage.extraLarge}
            genres={ani.genres}
            key={ani.id}
          />
        ))}
      </AnimeWrapper>
    </>
  );
}
