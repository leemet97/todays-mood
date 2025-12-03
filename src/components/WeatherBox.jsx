// 🌤 WeatherBox.jsx
import { useEffect, useState } from "react";
import styled from "styled-components";

// =============================
// Styled Components
// =============================
const Box = styled.div`
  position: fixed;
  left: 20px;
  bottom: 20px;
  width: 220px;
  padding: 18px 20px;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(12px);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 100;

  @media (max-width: 600px) {
    width: 170px;
    left: 10px;
    bottom: 10px;
    padding: 12px 14px;
  }
`;

const Temp = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 6px;

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const MainText = styled.div`
  font-size: 1rem;
  opacity: 0.9;
`;

const Comment = styled.div`
  font-size: 0.85rem;
  line-height: 1.3;
  margin-top: 10px;
  color: #444;

  @media (max-width: 600px) {
    font-size: 0.75rem;
  }
`;

const Select = styled.select`
  margin-top: 14px;
  width: 100%;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  outline: none;
  cursor: pointer;
  backdrop-filter: blur(4px);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const ReopenButton = styled.button`
  position: fixed;
  right: 20px;
  bottom: 20px;
  padding: 10px 14px;
  background: #ffdca8;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  z-index: 100;
  font-size: 14px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);

  @media (max-width: 600px) {
    right: 10px;
    bottom: 10px;
  }
`;

// =============================
// WeatherBox Component
// =============================
export default function WeatherBox() {
  const [temp, setTemp] = useState(null);
  const [main, setMain] = useState("");
  const [city, setCity] = useState("");
  const [comment, setComment] = useState("날씨를 불러오는 중…");
  const [hidden, setHidden] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_KEY;

  // 앱 로딩 시 → 기본 서울 날씨만 불러옴
  useEffect(() => {
    if (!API_KEY) {
      setComment("API 키 오류 🔑");
      return;
    }
    loadWeatherByCity("Seoul");
  }, []);

  // =============================
  // GPS 기반 날씨 (사용자 요청 시만 실행)
  // =============================
  function loadWeatherByGPS() {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
          );
          const data = await res.json();
          updateUI(data);
        } catch {
          setComment("GPS로 날씨를 가져올 수 없어요 😢");
        }
      },
      () => {
        setComment("위치 권한이 필요해요 📍");
      }
    );
  }

  // 도시 기반 날씨
  async function loadWeatherByCity(cityName) {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=kr`
      );
      const data = await res.json();
      updateUI(data);
    } catch {
      setComment("날씨 정보를 가져오지 못했어요 😢");
    }
  }

  const updateUI = (data) => {
    const t = Math.round(data.main.temp);
    const m = data.weather[0].main;
    setTemp(t);
    setMain(m);
    setCity(data.name);
    setComment(getComment(m, t));
  };

  const getComment = (main, temp) => {
    if (main === "Rain") return "비가 내려요 ☔";
    if (main === "Clear" && temp >= 24) return "맑고 따뜻한 날씨 ☀️";
    if (main === "Clear" && temp < 10) return "쌀쌀한 날씨 ❄️";
    if (main === "Clouds") return "구름 조금 ☁";
    if (main === "Snow") return "눈이 와요 ❄️✨";
    return "좋은 하루 보내세요 🌿";
  };

  if (hidden) {
    return (
      <ReopenButton onClick={() => setHidden(false)}>🌤 날씨 보기</ReopenButton>
    );
  }

  return (
    <Box>
      <CloseButton onClick={() => setHidden(true)}>✖</CloseButton>

      <Temp>{temp !== null ? `${temp}°C` : "--°C"}</Temp>
      <MainText>{city}</MainText>
      <Comment>{comment}</Comment>

      {/* 도시 선택 */}
      <Select
        onChange={(e) =>
          e.target.value === "gps"
            ? loadWeatherByGPS()
            : loadWeatherByCity(e.target.value)
        }
      >
        <option value="Seoul">서울</option>
        <option value="gps">📍 현재 위치(사용자 요청)</option>
        <option value="Busan">부산</option>
        <option value="Incheon">인천</option>
        <option value="Daegu">대구</option>
      </Select>
    </Box>
  );
}
