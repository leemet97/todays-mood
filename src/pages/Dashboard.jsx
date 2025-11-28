// src/pages/Dashboard.jsx
import React, { useState } from "react";
import styled from "styled-components";
import {
  FaBed,
  FaUtensils,
  FaToiletPaper,
  FaHeartbeat,
  FaCamera,
  FaWalking,
} from "react-icons/fa";
// 차트 라이브러리
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
// 데이터 불러오기
import { usersData, weeklyData, todaySchedule } from "../data/mockData";

// ==============================================
// 🎨 스타일 정의 (컴포넌트 밖)
// ==============================================

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const UserSelect = styled.select`
  padding: 10px 15px;
  border-radius: 12px;
  border: 2px solid #ff9f43;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  font-family: "Jua", sans-serif;
  cursor: pointer;
  outline: none;
  background: white;
  margin-left: auto;
`;

const TopMoodSection = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  align-items: center;
  gap: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  .emoji {
    font-size: 60px;
  }
  .text-box {
    flex: 1;
  }
  .text-box h2 {
    margin: 0;
    font-size: 24px;
    color: #333;
  }
  .text-box p {
    margin: 5px 0 0;
    color: #666;
    font-size: 16px;
  }
  .highlight {
    color: #ff9f43;
    font-weight: bold;
  }
`;

const BottomSection = styled.div`
  display: flex;
  gap: 20px;
  flex: 1;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LeftGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

const MenuCard = styled.div`
  background-color: ${(props) => (props.$active ? "#FF9F43" : "white")};
  color: ${(props) => (props.$active ? "white" : "#4A4A4A")};
  padding: 20px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-3px);
  }
  .icon {
    font-size: 28px;
  }
  .label {
    font-size: 18px;
    font-weight: bold;
  }
`;

const ScheduleBox = styled.div`
  background: white;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  flex: 1;

  h3 {
    margin: 0 0 20px 0;
    font-size: 18px;
    color: #555;
  }
`;

const ScheduleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px dashed #eee;
  font-size: 16px;

  color: ${(props) => (props.$done ? "#aaa" : "#333")};
  text-decoration: ${(props) => (props.$done ? "line-through" : "none")};

  font-weight: ${(props) =>
    !props.$done && props.$isNext ? "bold" : "normal"};
  color: ${(props) => (!props.$done && props.$isNext ? "#FF9F43" : "")};

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const RightDetail = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DetailBox = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  flex: 1;

  h3 {
    margin-top: 0;
    color: #888;
    font-size: 16px;
    margin-bottom: 15px;
  }
  p {
    font-size: 22px;
    line-height: 1.5;
    color: #333;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .detail-text {
    font-size: 16px;
    color: #666;
    font-weight: normal;
  }
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 220px;
  margin-top: 30px;
  background-color: #fafafa;
  border-radius: 15px;
  padding: 20px;
  box-sizing: border-box;

  h4 {
    margin: 0 0 10px 0;
    font-size: 14px;
    color: #aaa;
  }
`;

const NurseCommentBox = styled(DetailBox)`
  background-color: #fff5f5;
  border: 1px solid #ffe0e0;
  flex: 0.4;

  h3 {
    color: #ff6b6b;
  }
  p {
    font-size: 18px;
    font-weight: normal;
  }
`;

// ==============================================
// 🚀 컴포넌트 로직 시작
// ==============================================

const Dashboard = () => {
  const [selected, setSelected] = useState("수면");
  const [currentUserId, setCurrentUserId] = useState(0);

  // [NEW] 사진 미리보기용 State
  const [previewImage, setPreviewImage] = useState(null);

  // 현재 선택된 어르신 데이터
  const currentUserData = usersData[currentUserId] || usersData[0];

  const icons = {
    수면: <FaBed />,
    배설: <FaToiletPaper />,
    식사: <FaUtensils />,
    바이탈: <FaHeartbeat />,
    활동: <FaWalking />,
    사진: <FaCamera />,
  };

  // 차트 데이터 및 일과표 인덱스
  const chartData = weeklyData[selected] || weeklyData["default"];
  const nextScheduleIndex = todaySchedule.findIndex((item) => !item.done);

  // 어르신 변경 핸들러
  const handleUserChange = (e) => {
    setCurrentUserId(Number(e.target.value));
    setPreviewImage(null); // 어르신 바뀌면 미리보기 초기화
  };

  // [NEW] 사진 선택 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  return (
    <Container>
      {/* 1. 상단 헤더 & 어르신 선택 */}
      <TopMoodSection>
        <div className="emoji">
          {currentUserData.user.mood.split(" ")[1] || "🥰"}
        </div>
        <div className="text-box">
          <h2>
            오늘 <span className="highlight">{currentUserData.user.name}</span>{" "}
            님은 <span className="highlight">{currentUserData.user.mood}</span>{" "}
            입니다.
          </h2>
          <p>{currentUserData.user.date} 기록</p>
        </div>

        <UserSelect onChange={handleUserChange} value={currentUserId}>
          {usersData.map((data) => (
            <option key={data.id} value={data.id}>
              {data.user.name} 님 ({data.user.room})
            </option>
          ))}
        </UserSelect>
      </TopMoodSection>

      {/* 2. 하단 좌우 분할 */}
      <BottomSection>
        {/* [왼쪽] 카드 그리드 + 일과표 */}
        <LeftColumn>
          <LeftGrid>
            {Object.keys(currentUserData.status).map((key) => (
              <MenuCard
                key={key}
                $active={selected === key}
                onClick={() => setSelected(key)}
              >
                <div className="icon">{icons[key]}</div>
                <div className="label">{key}</div>
              </MenuCard>
            ))}
          </LeftGrid>

          <ScheduleBox>
            <h3>🕒 오늘의 일과표</h3>
            {todaySchedule.map((item, idx) => (
              <ScheduleItem
                key={idx}
                $done={item.done}
                $isNext={idx === nextScheduleIndex}
              >
                <span style={{ fontWeight: "bold" }}>{item.time}</span>
                <span>{item.activity}</span>
              </ScheduleItem>
            ))}
          </ScheduleBox>
        </LeftColumn>

        {/* [오른쪽] 상세 기록 + (사진업로드 OR 그래프) */}
        <RightDetail>
          <DetailBox>
            <h3>📌 {selected} 상세 기록</h3>
            <p>{currentUserData.status[selected].text}</p>
            <div className="detail-text">
              ℹ️ {currentUserData.status[selected].detail}
            </div>

            {/* 👇 조건부 렌더링: '사진' 탭이면 업로더, 아니면 그래프 보여주기 👇 */}
            {selected === "사진" ? (
              // [사진 업로드 UI]
              <div style={{ marginTop: "30px" }}>
                <input
                  type="file"
                  accept="image/*"
                  id="photo-upload"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="photo-upload"
                  style={{
                    display: "inline-block",
                    padding: "10px 20px",
                    backgroundColor: "#FF9F43",
                    color: "white",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    marginBottom: "20px",
                  }}
                >
                  📸 새 사진 추가하기 +
                </label>

                {previewImage ? (
                  <div style={{ marginTop: "20px" }}>
                    <img
                      src={previewImage}
                      alt="미리보기"
                      style={{
                        width: "100%",
                        borderRadius: "15px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      }}
                    />
                    <p
                      style={{
                        textAlign: "center",
                        color: "#888",
                        fontSize: "14px",
                        marginTop: "10px",
                      }}
                    >
                      방금 추가된 사진입니다.
                    </p>
                  </div>
                ) : (
                  <div
                    style={{
                      height: "150px",
                      backgroundColor: "#f9f9f9",
                      borderRadius: "15px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#aaa",
                    }}
                  >
                    여기에 추가한 사진이 나타납니다.
                  </div>
                )}
              </div>
            ) : (
              // [주간 그래프 UI]
              <ChartWrapper>
                <h4>📊 최근 7일간 변화 추이</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 12, fill: "#888" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "10px",
                        border: "none",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                      }}
                      cursor={{ fill: "#eee" }}
                    />
                    <Bar dataKey="value" radius={[5, 5, 0, 0]} barSize={20}>
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.day === "일" || entry.day === "토"
                              ? "#FF9F43"
                              : "#FFD1A9"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartWrapper>
            )}
          </DetailBox>

          <NurseCommentBox>
            <h3>👩‍⚕️ 간호사 선생님의 한마디</h3>
            <p>"{currentUserData.nurseComment}"</p>
          </NurseCommentBox>
        </RightDetail>
      </BottomSection>
    </Container>
  );
};

export default Dashboard;
