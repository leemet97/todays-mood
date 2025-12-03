// src/pages/Dashboard.jsx
import React, { useState } from "react";
import styled, { css } from "styled-components";

import {
  FaBed,
  FaUtensils,
  FaToiletPaper,
  FaHeartbeat,
  FaCamera,
  FaWalking,
} from "react-icons/fa";

import { usersData, weeklyData } from "../data/mockData";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ===================== Colors =====================
const colors = {
  mint: "#79D8C8",
  mintDeep: "#4BC3AF",
  mintDark: "#2DAA97",
  bg: "#E9F7F5",
};

// 전체 박스
const Container = styled.div`
  width: 100%;
  padding: 10px 10px 60px 10px;
`;

// 제목
const SectionTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 3px solid ${colors.mintDeep};
  width: fit-content;
`;

// ===================== TOP CARD =====================
const TopMoodSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  align-items: center;
  gap: 30px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);

  .emoji {
    font-size: 60px;
  }
  .text-box {
    flex: 1;
  }
  .highlight {
    color: ${colors.mintDeep};
    font-weight: bold;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const UserSelect = styled.select`
  padding: 12px 15px;
  border-radius: 14px;
  border: 2px solid ${colors.mintDeep};
  background: white;
  font-size: 16px;
  font-weight: bold;
`;

// ===================== Nurse Card =====================
const NurseMintCard = styled.div`
  background: ${colors.mint};
  padding: 22px;
  border-radius: 18px;
  color: white;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  margin: 20px auto;
  max-width: 600px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);

  small {
    display: block;
    margin-top: 6px;
    font-size: 14px;
    opacity: 0.9;
  }
`;

// ===================== CARD GRID =====================
const CardGrid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MenuCard = styled.div`
  background-color: ${(p) => (p.$active ? colors.mintDark : "white")};
  color: ${(p) => (p.$active ? "white" : "#333")};
  padding: 24px;
  border-radius: 18px;
  text-align: center;
  cursor: pointer;
  transition: 0.25s;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  position: relative;

  &:hover {
    transform: translateY(-4px);
  }

  .icon {
    font-size: 30px;
    margin-bottom: 10px;
  }
  .label {
    font-size: 18px;
    font-weight: bold;
  }
`;

// ===================== MOBILE DETAIL (카드 바로 아래) =====================
const MobileDetail = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    background: #ffffff;
    margin-top: 10px;
    border-radius: 15px;
    box-shadow: 0 5px 18px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    transition: all 0.3s ease;

    ${(p) =>
      p.open
        ? css`
            max-height: 300px;
            padding: 16px;
            opacity: 1;
          `
        : css`
            max-height: 0;
            padding: 0 16px;
            opacity: 0;
          `}
  }
`;

// ===================== RIGHT CHART =====================
const MiddleWrap = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 18px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  height: 320px;
`;

// ===================== DESKTOP DETAIL =====================
const DesktopDetail = styled.div`
  background: white;
  padding: 30px;
  border-radius: 20px;
  margin-top: 30px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    display: none;
  }
`;

// ===================== 7일 그래프 =====================
const WeeklyChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="day" />
        <YAxis hide />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#4BC3AF"
          strokeWidth={3}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

// ===================== MAIN FUNCTION =====================
export default function Dashboard() {
  const [selected, setSelected] = useState("수면");
  const [currentUserId, setCurrentUserId] = useState(0);
  const [showNurse, setShowNurse] = useState(true);

  const currentUser = usersData[currentUserId];
  const weeklyChartData = weeklyData[selected] || weeklyData["default"];

  const icons = {
    수면: <FaBed />,
    배설: <FaToiletPaper />,
    식사: <FaUtensils />,
    바이탈: <FaHeartbeat />,
    활동: <FaWalking />,
    사진: <FaCamera />,
  };

  return (
    <Container>
      <SectionTitle>오늘의 건강날씨 🌿</SectionTitle>

      {/* 상단 상태 카드 */}
      <TopMoodSection>
        <div className="emoji">{currentUser.user.mood.split(" ")[1]}</div>

        <div className="text-box">
          <h2>
            오늘 <span className="highlight">{currentUser.user.name}</span> 님은{" "}
            <span className="highlight">{currentUser.user.mood}</span> 입니다.
          </h2>
          <p>{currentUser.user.date} 기록</p>
        </div>

        <UserSelect
          onChange={(e) => setCurrentUserId(Number(e.target.value))}
          value={currentUserId}
        >
          {usersData.map((u) => (
            <option key={u.id} value={u.id}>
              {u.user.name} ({u.user.room})
            </option>
          ))}
        </UserSelect>
      </TopMoodSection>

      {/* 간호사 카드 */}
      {showNurse && (
        <NurseMintCard onClick={() => setShowNurse(false)}>
          👩‍⚕️ {currentUser.nurseComment}
          <small>👉 터치하면 기록 카드가 열립니다.</small>
        </NurseMintCard>
      )}

      {/* 카드 + 차트 2열 */}
      {!showNurse && (
        <MiddleWrap>
          {/* 왼쪽 카드 */}
          <div>
            <CardGrid>
              {Object.keys(currentUser.status).map((key) => (
                <MenuCard
                  key={key}
                  $active={selected === key}
                  onClick={() => setSelected(key)}
                >
                  <div className="icon">{icons[key]}</div>
                  <div className="label">{key}</div>

                  {/* MOBILE DETAIL — 카드 바로 아래 아코디언 */}
                  <MobileDetail open={selected === key}>
                    <h4>📌 {key} 상세 기록</h4>
                    <p>{currentUser.status[key].text}</p>
                    <p style={{ color: "#777" }}>
                      {currentUser.status[key].detail}
                    </p>
                  </MobileDetail>
                </MenuCard>
              ))}
            </CardGrid>
          </div>

          {/* 오른쪽 7일 차트 (PC 기준) */}
          <ChartBox>
            <h3>📈 지난 7일 {selected} 변화</h3>
            <WeeklyChart data={weeklyChartData} />
          </ChartBox>
        </MiddleWrap>
      )}

      {/* 데스크탑 상세 (아래 전체 폭) */}
      {!showNurse && (
        <DesktopDetail>
          <h3>📌 {selected} 상세 기록</h3>
          <p>{currentUser.status[selected].text}</p>
          <p style={{ color: "#777" }}>{currentUser.status[selected].detail}</p>
        </DesktopDetail>
      )}
    </Container>
  );
}
