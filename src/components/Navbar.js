import React from "react";
import styledComponents from "styled-components";

export default function Navbar() {
  return (
    <nav>
      <span>Logo</span>
      <ul>
        <li>
          <a href="#">Spring</a>
        </li>
        <li>
          <a href="#">Summer</a>
        </li>
        <li>
          <a href="#">Fall</a>
        </li>
        <li>
          <a href="#">Winter</a>
        </li>
      </ul>
    </nav>
  );
}
