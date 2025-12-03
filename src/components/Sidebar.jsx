// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 20px;
  font-family: "Pretendard", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
    padding: 12px 10px;
  }
`;

const MenuButton = styled(Link)`
  display: block;
  padding: 10px 16px;
  border-radius: 999px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props.$active ? "#ffffff" : "#555")};
  background: ${(props) => (props.$active ? "#ff9f43" : "#ffffff")};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  text-align: center;
  white-space: nowrap;

  &:hover {
    background: #ffb463;
    color: #fff;
  }

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 8px 12px;
  }
`;

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <SidebarContainer>
      <MenuButton to="/" $active={pathname === "/"}>
        메인메뉴
      </MenuButton>
      <MenuButton to="/calendar" $active={pathname.startsWith("/calendar")}>
        캘린더
      </MenuButton>
      <MenuButton to="/community" $active={pathname.startsWith("/community")}>
        커뮤니티
      </MenuButton>
      {/* 필요하면 나중에 메뉴 더 추가 */}
    </SidebarContainer>
  );
};

export default Sidebar;
