import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  height: 5vh;
  background-color: red;
  color: #fff;
`;

const NavLeft = styled.div``;

const NavRight = styled.div``;

const NavList = styled.ul``;

const NavItem = styled.li``;

const NavLink = styled(Link)``;

export default function Navbar() {
  return (
    <Nav>
      <NavLeft>
        <span>Logo</span>
      </NavLeft>
      <NavRight>
        <NavList>
          <NavItem>
            <NavLink to={`/Spring`}>Spring</NavLink>
          </NavItem>
        </NavList>
      </NavRight>
    </Nav>
  );
}
