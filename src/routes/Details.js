import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { marked } from "marked";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import CharacterContainer from "../components/CharacterContainer";
import SeiyuuContainer from "../components/SeiyuuContainer";

const Desc = styled.div`
  font-size: 1.15rem;
  line-height: 2;
  letter-spacing: 0.25px;
`;

const BannerImageWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const BannerOverlay = styled.div`
  background-color: rgba(0, 62, 119, 0.8);
  opacity: 0.9;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const BannerImage = styled.img`
  height: auto;
  width: 100%;
  display: block;
`;

const AnimeInfoWrapper = styled.section`
  display: flex;
  position: relative;
  padding-bottom: 15rem;
`;

const AnimeInfo = styled.div`
  border-radius: 10px;
  width: 90%;
  margin: 0 auto;
  background-color: #fff;
  position: relative;
  z-index: 12;
  display: flex;

  @media (max-width: 750px) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const AnimeTitleWrapper = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
  position: relative;
  margin-top: -15rem;

  @media (max-width: 750px) {
    margin: 0;
  }
`;

const AnimeDescWrapper = styled.div`
  flex: 3;
`;

const CastCard = styled.div`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 1rem;
  width: 28rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  place-items: center;
`;

const CastContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding-bottom: 10rem;
`;

export default function Details() {
  const [anime, setAnime] = useState("");
  const [title, setTitle] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [desc, setDesc] = useState("");
  const [characters, setCharacters] = useState([]);
  const [seiyuu, setSeiyuu] = useState("");
  const [bannerSrc, setBannerSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

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
      genres
      season
      seasonYear
         isLicensed
      streamingEpisodes {
        title
        thumbnail
        url
        site
      }
characters {
 edges {
          node {
            name {
              first
              middle
              last
              full
              native
              userPreferred
            }
            image {
              large
              medium
            }
          }
   id
          role
          voiceActors(language: JAPANESE, sort:ROLE) {
            id
            name {
              first
              middle
              last
              full
              native
              userPreferred
            }
            image {
              large
              medium
            }
          }
        }
}
      coverImage {
        extraLarge
        large
        medium
        color
      }
      bannerImage
    }
  }


`;

  //Set ID to useParams ID
  var variables = {
    id: id,
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

  const fetchAnime = async () => {
    setLoading(true);
    const res = await fetch(url, options);
    const data = await res.json();
    // defining and storying each variable in a hook because
    // it ends up being undefined for some reason if I just set anime
    setAnime(data.data.Media);
    setTitle(data.data.Media.title.english);
    setImgSrc(data.data.Media.coverImage.large);
    setBannerSrc(data.data.Media.bannerImage);
    setCharacters(data.data.Media.characters.edges);

    setDesc(marked(data.data.Media.description));

    console.log(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAnime();
  }, []);

  return (
    <div>
      {loading ? (
        <div>
          <p>Page is loading yo!</p>
        </div>
      ) : (
        <>
          <BannerImageWrapper>
            <Navbar />
            <BannerImage src={bannerSrc} />
            <BannerOverlay />
          </BannerImageWrapper>
          <AnimeInfoWrapper>
            <AnimeInfo>
              <AnimeTitleWrapper>
                <img src={imgSrc} />
              </AnimeTitleWrapper>
              <AnimeDescWrapper>
                <h2>{title}</h2>
                <Desc dangerouslySetInnerHTML={{ __html: desc }} />
              </AnimeDescWrapper>
            </AnimeInfo>
          </AnimeInfoWrapper>
          <CastContainer>
            {/* splice to limit number of map through */}
            {characters.slice(0, 8).map((character) => (
              <CastCard key={character.id}>
                <CharacterContainer
                  lastName={character.node.name.last}
                  firstName={character.node.name.first}
                  image={character.node.image.medium}
                />
                {character.voiceActors.map((va) => (
                  <SeiyuuContainer
                    lastName={va.name.last}
                    firstName={va.name.first}
                    image={va.image.medium}
                  />
                ))}
              </CastCard>
            ))}
          </CastContainer>
        </>
      )}
    </div>
  );
}
