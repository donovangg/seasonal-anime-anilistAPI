import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaHome, FaGithub, FaTwitter } from "react-icons/fa";

const NavContainer = styled.div`
  height: 5vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

const NavLeft = styled.div`
  flex: 1;
  margin-left: 2rem;
`;

const NavRight = styled.div`
  flex: 1;
  position: relative;
`;

const NavList = styled.ul`
  display: flex;
`;

const NavItem = styled.li`
  list-style: none;
  margin: 0 1rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 2rem;
`;

const ExLink = styled.a`
  text-decoration: none;
  color: #fff;
  font-size: 2rem;
`;

export default function Navbar() {
  return (
    <NavContainer>
      <Nav>
        <NavLeft>
          <NavLink to={`/`}>
            <FaHome />
          </NavLink>
        </NavLeft>
        <NavRight>
          <NavList>
            <NavItem>
              <ExLink
                target="_blank"
                href="https://github.com/donovangomez/seasonal-anime-anilistAPI"
              >
                <FaGithub />
              </ExLink>
            </NavItem>
            <NavItem>
              <ExLink target="_blank" href="https://twitter.com/hi_im_donovan">
                <FaTwitter />
              </ExLink>
            </NavItem>
          </NavList>
        </NavRight>
      </Nav>
    </NavContainer>
  );
}
