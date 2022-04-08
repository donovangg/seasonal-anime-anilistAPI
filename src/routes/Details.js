import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    setDesc(data.data.Media.description);

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
          <h2>Details page for {anime.id}</h2>
          <p>{desc}</p>
          <img src={bannerSrc} />
          <h2>{title}</h2>
          <img src={imgSrc} />
        </>
      )}
    </div>
  );
}
