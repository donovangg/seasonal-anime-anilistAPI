import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { marked } from "marked";
import styled from "styled-components";

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

const AnimeInfoWrapper = styled.div`
  display: flex;
  border: 2px solid red;
  margin: -2rem auto;
  // justify-content: center;
  // align-items: center;
  // margin: 0 auto;
  // z-index: 12;
  // position: fixed;
  // background-color: #fff;
  width: 90vw;
`;

const AnimeTitleWrapper = styled.div``;

const AnimeDescWrapper = styled.div``;

export default function Details() {
  const [anime, setAnime] = useState("");
  const [title, setTitle] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [desc, setDesc] = useState("");
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
      streamingEpisodes {
        title
        thumbnail
        url
        site
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
            <BannerImage src={bannerSrc} />
            <BannerOverlay />
          </BannerImageWrapper>
          <AnimeInfoWrapper>
            <AnimeTitleWrapper>
              <h2>{title}</h2>
              <img src={imgSrc} />
            </AnimeTitleWrapper>
            <AnimeDescWrapper>
              <Desc dangerouslySetInnerHTML={{ __html: desc }} />
            </AnimeDescWrapper>
          </AnimeInfoWrapper>
        </>
      )}
    </div>
  );
}
