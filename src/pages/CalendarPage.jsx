// src/pages/CalendarPage.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 스타일 불러오기
import styled from "styled-components";
import moment from "moment"; // 날짜 포맷팅 도구

// 1. 전체 레이아웃 (좌우 분할)
const Container = styled.div`
  display: flex;
  gap: 30px;
  height: 100%;

  @media (max-width: 900px) {
    flex-direction: column; /* 화면 작으면 위아래로 */
  }
`;

// 2. 왼쪽: 달력 영역 (스타일 커스텀)
const CalendarWrapper = styled.div`
  flex: 1;
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  /* 여기서부터 react-calendar 디자인 덮어쓰기 (바이브 코딩!) */
  .react-calendar {
    width: 100%;
    border: none;
    font-family: "Jua", sans-serif;
  }

  /* 년/월 상단 네비게이션 */
  .react-calendar__navigation button {
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }

  /* 요일 표시 (월,화,수...) */
  .react-calendar__month-view__weekdays {
    font-size: 14px;
    color: #888;
    abbr {
      text-decoration: none;
    }
  }

  /* 날짜 타일 하나하나 */
  .react-calendar__tile {
    height: 80px; /* 높이를 키워서 시원하게 */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 10px;
    font-size: 16px;
    border-radius: 15px; /* 둥글게 */
  }

  /* 현재 선택된 날짜 (오렌지색 배경) */
  .react-calendar__tile--active {
    background: #ff9f43 !important;
    color: white !important;
  }

  /* 오늘 날짜 (연한 오렌지 배경) */
  .react-calendar__tile--now {
    background: #fff5eb;
    color: #ff9f43;
    font-weight: bold;
  }

  /* 타일에 마우스 올렸을 때 */
  .react-calendar__tile:hover {
    background: #f0f0f0;
  }
`;

// 3. 오른쪽: 상세 기록 영역
const LogSection = styled.div`
  flex: 0.8;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DateTitle = styled.h2`
  margin: 0;
  color: #333;
  font-size: 24px;

  span {
    color: #ff9f43;
  }
`;

const LogCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  flex: 1;

  .empty-message {
    text-align: center;
    color: #aaa;
    margin-top: 50px;
    font-size: 18px;
  }
`;

const LogItem = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;

  h3 {
    margin: 0 0 10px;
    color: #555;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  p {
    margin: 0;
    color: #333;
    font-size: 18px;
    line-height: 1.5;
  }
  .badge {
    background: #fff5eb;
    color: #ff9f43;
    padding: 5px 10px;
    border-radius: 8px;
    font-size: 14px;
  }
`;

const CalendarPage = () => {
  const [date, setDate] = useState(new Date()); // 현재 선택된 날짜

  // 가짜 데이터 (DB 대신 사용)
  const logs = {
    "2025-11-24": {
      mood: "매우 좋음 🥰",
      notes: [
        {
          title: "식사",
          content: "점심에 나온 불고기를 아주 맛있게 드셨습니다.",
        },
        {
          title: "활동",
          content: "오후 노래 교실에서 마이크를 잡고 노래를 부르셨어요.",
        },
      ],
    },
    "2025-11-20": {
      mood: "보통 🙂",
      notes: [
        {
          title: "수면",
          content: "새벽에 두 번 정도 깨서 화장실을 다녀오셨습니다.",
        },
        {
          title: "건강",
          content: "혈압이 약간 높게 나와서 안정을 취했습니다.",
        },
      ],
    },
  };

  // 선택된 날짜를 문자열(YYYY-MM-DD)로 변환
  const dateKey = moment(date).format("YYYY-MM-DD");
  const todayLog = logs[dateKey]; // 그 날짜에 기록이 있는지 확인

  return (
    <Container>
      {/* 왼쪽: 달력 */}
      <CalendarWrapper>
        <Calendar
          onChange={setDate}
          value={date}
          formatDay={(locale, date) => moment(date).format("D")} // '1일' 대신 '1'만 표시
        />
      </CalendarWrapper>

      {/* 오른쪽: 기록 보여주기 */}
      <LogSection>
        <DateTitle>
          <span>{moment(date).format("M월 D일")}</span>의 기록 📝
        </DateTitle>

        <LogCard>
          {todayLog ? (
            <>
              <LogItem>
                <h3>
                  오늘의 기분 <span className="badge">{todayLog.mood}</span>
                </h3>
              </LogItem>
              {todayLog.notes.map((note, index) => (
                <LogItem key={index}>
                  <h3>📍 {note.title}</h3>
                  <p>{note.content}</p>
                </LogItem>
              ))}
            </>
          ) : (
            <div className="empty-message">
              <div style={{ fontSize: "50px", marginBottom: "20px" }}>📭</div>
              기록된 내용이 없습니다.
              <br />
              (24일이나 20일을 클릭해보세요!)
            </div>
          )}
        </LogCard>
      </LogSection>
    </Container>
  );
};

export default CalendarPage;
