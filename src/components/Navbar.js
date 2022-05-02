import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  height: 5vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
`;

const NavLeft = styled.div`
  flex: 1;
`;

const NavRight = styled.div`
  flex: 1;
`;

const NavList = styled.ul`
  display: flex;
`;

const NavItem = styled.li`
  list-style: none;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

export default function Navbar() {
  return (
    <Nav>
      <NavLeft>
        <NavLink to={`/`}>Home</NavLink>
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
