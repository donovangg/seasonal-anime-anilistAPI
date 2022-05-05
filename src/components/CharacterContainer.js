import React from "react";

export default function CharacterContainer({ lastName, firstName, image }) {
  return (
    <div>
      <h2>
        {lastName} {firstName}
      </h2>
      <img src={image} />
    </div>
  );
}
