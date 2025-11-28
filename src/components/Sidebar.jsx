// src/components/Sidebar.jsx
import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaCommentDots } from "react-icons/fa";

const SidebarContainer = styled.div`
  width: 240px;
  background-color: white;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #eee;

  /* 모바일에서는 숨기거나 줄이는 반응형 처리가 필요할 수 있음 */
  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.h1`
  font-size: 24px;
  color: #ff9f43;
  margin-bottom: 40px;
  text-align: center;
  font-family: "Jua", sans-serif;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  text-decoration: none;
  color: ${(props) => (props.$active ? "white" : "#888")};
  background-color: ${(props) => (props.$active ? "#FF9F43" : "transparent")};
  border-radius: 12px;
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.$active ? "#FF9F43" : "#FFF5EB")};
    transform: translateX(5px);
  }
`;

const Sidebar = () => {
  const location = useLocation();

  return (
    <SidebarContainer>
      <Logo>오늘의 마음날씨🌿</Logo>
      <Menu>
        {/* $active는 스타일드 컴포넌트에 props를 전달할 때 경고를 막기 위한 규칙입니다 */}
        <MenuItem to="/" $active={location.pathname === "/"}>
          <FaHome /> 대시보드
        </MenuItem>
        <MenuItem to="/calendar" $active={location.pathname === "/calendar"}>
          <FaCalendarAlt /> 캘린더
        </MenuItem>
        <MenuItem to="/community" $active={location.pathname === "/community"}>
          <FaCommentDots /> 커뮤니티
        </MenuItem>
      </Menu>
    </SidebarContainer>
  );
};

export default Sidebar;
