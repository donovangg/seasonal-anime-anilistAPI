import React from "react";

export default function SeiyuuContainer({ firstName, lastName, image }) {
  return (
    <div>
      <h2>
        {lastName} {firstName}
      </h2>
      <img src={image} />
    </div>
  );
}
