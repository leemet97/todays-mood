// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import WeatherBox from "./WeatherBox";

const LayoutWrapper = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 100vh;
  background: #f6f8fa;

  /* 모바일에서는 grid → flex로 변경 */
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    height: auto;
  }
`;

const SidebarArea = styled.aside`
  background: white;
  border-right: 1px solid #e5e5e5;
  padding: 30px 20px;
  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #eee;
  }
`;

const MainArea = styled.main`
  overflow-y: auto;
  padding: 30px 40px;

  @media (max-width: 768px) {
    padding: 18px;
  }
`;

const Layout = () => {
  return (
    <LayoutWrapper>
      <SidebarArea>
        <Sidebar />
      </SidebarArea>

      <MainArea>
        <WeatherBox />
        <Outlet />
      </MainArea>
    </LayoutWrapper>
  );
};

export default Layout;
