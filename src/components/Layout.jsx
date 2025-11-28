// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom"; // 👈 1. 이 줄이 있는지 확인!
import styled from "styled-components";
import Sidebar from "./Sidebar";

const LayoutContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #f5f6fa;
`;

const MainContent = styled.main`
  flex: 1; /* 남은 오른쪽 공간 다 차지 */
  padding: 30px;
  overflow-y: auto;
`;

const Layout = () => {
  return (
    <LayoutContainer>
      <Sidebar />
      {/* 👇 2. 여기가 핵심입니다! Outlet이 없으면 오른쪽이 텅 빕니다! */}
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;
