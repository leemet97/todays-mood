// src/data/mockData.js

// 🚨 5명의 어르신 데이터로 교체!
export const usersData = [
  // 1. 김순자 님 (건강하고 활기찬 케이스)
  {
    id: 0,
    user: {
      name: "김순자",
      age: 82,
      room: "203호",
      mood: "행복함 🥰",
      date: "2025년 11월 25일",
    },
    status: {
      수면: {
        text: "총 8시간 꿀잠 주무셨습니다. 😴",
        detail: "새벽 2시에 잠깐 깨셨으나 바로 잠드심.",
      },
      배설: {
        text: "아침 1회, 아주 건강하십니다. 🚽",
        detail: "불편함 없이 아주 잘 보셨습니다.",
      },
      식사: {
        text: "점심 한 그릇 뚝딱 비우셨어요! 🍚",
        detail: "불고기를 반찬 투정 없이 잘 드셨습니다.",
      },
      바이탈: {
        text: "혈압 120/80 정상입니다. 💓",
        detail: "체온 36.5도, 맥박 78회 유지 중.",
      },
      활동: {
        text: "산책 프로그램 1등으로 참여! 🏃",
        detail: "컨디션이 좋아 30분 산책 완주하셨습니다.",
      },
      사진: {
        text: "오늘 찍은 사진 3장이 있어요. 📸",
        detail: "활동 시간에 찍은 독사진입니다.",
      },
    },
    nurseComment:
      "오늘 얼굴에 생기가 돌아요! 표정이 밝아서 저희도 기분이 좋았습니다 😊 보호자님 안심하셔도 됩니다.",
  },

  // 2. 박철수 님 (우울감이 있고 건강이 조금 안 좋은 케이스)
  {
    id: 1,
    user: {
      name: "박철수",
      age: 78,
      room: "205호",
      mood: "조금 우울 ☁️",
      date: "2025년 11월 25일",
    },
    status: {
      수면: {
        text: "잠을 좀 설치셨습니다. 🥱",
        detail: "새벽에 자주 깨서 TV를 보셨습니다.",
      },
      배설: {
        text: "변비 기운이 조금 있으세요. 💊",
        detail: "유산균 챙겨 드렸습니다.",
      },
      식사: {
        text: "입맛이 없으신지 반만 드셨어요. 🥣",
        detail: "죽으로 변경해 드렸습니다.",
      },
      바이탈: {
        text: "혈압 135/90 주의 필요. ⚠️",
        detail: "지속적으로 체크 중입니다.",
      },
      활동: {
        text: "프로그램 참여를 거부하셨어요. 🛋️",
        detail: "방에서 휴식을 원하셨습니다.",
      },
      사진: { text: "사진 기록이 없습니다. 📷", detail: "" },
    },
    nurseComment:
      "오늘 기분이 조금 다운되어 계세요. 따님께 안부 전화 부탁드립니다.",
  },

  // 3. 이영희 님 (치매 증상이 조금 있고 배회하시는 케이스)
  {
    id: 2,
    user: {
      name: "이영희",
      age: 85,
      room: "201호",
      mood: "멍함 😶",
      date: "2025년 11월 25일",
    },
    status: {
      수면: {
        text: "새벽에 배회 증상이 있었습니다. 👣",
        detail: "간호 스테이션으로 나오셔서 모셔다드렸습니다.",
      },
      배설: {
        text: "실수가 조금 있었습니다. 💦",
        detail: "기저귀 교체 후 뽀송하게 해드렸습니다.",
      },
      식사: {
        text: "밥을 드시고도 또 달라고 하셨어요. 🍚",
        detail: "간식으로 바나나를 드렸습니다.",
      },
      바이탈: {
        text: "혈압/맥박 모두 정상입니다. ✅",
        detail: "신체적 건강 상태는 아주 양호합니다.",
      },
      활동: {
        text: "색칠 공부에 집중하셨습니다. 🎨",
        detail: "빨간색 색연필만 계속 사용하셨어요.",
      },
      사진: {
        text: "사진 1장이 있습니다. 📸",
        detail: "집중해서 색칠하시는 모습",
      },
    },
    nurseComment:
      "깜빡깜빡하시는 증상이 조금 보였지만, 식사도 잘 하시고 신체 컨디션은 좋습니다.",
  },

  // 4. 최민호 님 (재활 치료 중이신 까칠하지만 회복 중인 케이스)
  {
    id: 3,
    user: {
      name: "최민호",
      age: 74,
      room: "206호",
      mood: "통증 😖",
      date: "2025년 11월 25일",
    },
    status: {
      수면: {
        text: "다리 통증으로 뒤척이셨습니다. 💊",
        detail: "진통제 복용 후 주무셨습니다.",
      },
      배설: {
        text: "화장실 이동 시 부축해 드렸습니다. 🦽",
        detail: "배변 활동은 원활하십니다.",
      },
      식사: {
        text: "고기 반찬 위주로 잘 드셨습니다. 🍖",
        detail: "단백질 섭취량이 아주 좋습니다.",
      },
      바이탈: {
        text: "미열이 약간 있습니다 (37.2도). 🌡️",
        detail: "얼음 찜질을 해드렸습니다.",
      },
      활동: {
        text: "오후 재활 훈련을 힘들어하셨어요. 💪",
        detail: "그래도 끝까지 운동 마치셨습니다.",
      },
      사진: {
        text: "재활 운동 영상이 있습니다. 📹",
        detail: "걷기 연습하시는 모습",
      },
    },
    nurseComment:
      "재활 훈련 때문에 근육통이 좀 있으십니다. 그래도 어제보다 걷는 자세가 좋아지셨어요!",
  },

  // 5. 정말숙 님 (소녀 감성, 수다쟁이 케이스)
  {
    id: 4,
    user: {
      name: "정말숙",
      age: 80,
      room: "202호",
      mood: "신남 😆",
      date: "2025년 11월 25일",
    },
    status: {
      수면: {
        text: "옆자리 어르신과 수다 떨다 주무셨어요. 🗣️",
        detail: "10시에 소등하고 주무셨습니다.",
      },
      배설: {
        text: "아주 건강하십니다. 쾌변! ✨",
        detail: "스스로 화장실 잘 다녀오십니다.",
      },
      식사: {
        text: "간식을 너무 많이 드셨어요. 🍪",
        detail: "저녁 식사량을 조금 조절했습니다.",
      },
      바이탈: {
        text: "혈압 정상, 컨디션 최고. 👍",
        detail: "어디 아픈 곳 없이 건강하십니다.",
      },
      활동: {
        text: "노래 교실 분위기 메이커! 🎤",
        detail: "트로트를 3곡이나 부르셨어요.",
      },
      사진: {
        text: "사진 5장이 있습니다. 📸",
        detail: "친구분들과 찍은 단체 사진",
      },
    },
    nurseComment:
      "오늘 요양원에서 제일 즐거워 보이셨어요. 짝꿍 할머니랑 하루 종일 붙어 다니셨답니다.",
  },
];

// ... (아래 weeklyData, todaySchedule 등은 그대로 두세요) ...
// (참고: 원래는 어르신마다 그래프 데이터(weeklyData)도 다르게 보여줘야 완벽하지만,
// 지금은 데이터 구조가 복잡해지니 그래프는 '공통 데이터'를 보여주는 걸로 유지할게요!)
export const weeklyData = {
  수면: [
    { day: "월", value: 6 },
    { day: "화", value: 7 },
    { day: "수", value: 8 },
    { day: "목", value: 5 },
    { day: "금", value: 8 },
    { day: "토", value: 9 },
    { day: "일", value: 8 },
  ],
  식사: [
    { day: "월", value: 80 },
    { day: "화", value: 100 },
    { day: "수", value: 90 },
    { day: "목", value: 100 },
    { day: "금", value: 50 },
    { day: "토", value: 100 },
    { day: "일", value: 100 },
  ],
  바이탈: [
    { day: "월", value: 120 },
    { day: "화", value: 118 },
    { day: "수", value: 122 },
    { day: "목", value: 125 },
    { day: "금", value: 120 },
    { day: "토", value: 119 },
    { day: "일", value: 120 },
  ],
  활동: [
    { day: "월", value: 20 },
    { day: "화", value: 30 },
    { day: "수", value: 10 },
    { day: "목", value: 40 },
    { day: "금", value: 30 },
    { day: "토", value: 20 },
    { day: "일", value: 30 },
  ],
  배설: [
    { day: "월", value: 1 },
    { day: "화", value: 1 },
    { day: "수", value: 2 },
    { day: "목", value: 1 },
    { day: "금", value: 1 },
    { day: "토", value: 0 },
    { day: "일", value: 1 },
  ],
  사진: [
    { day: "월", value: 2 },
    { day: "화", value: 5 },
    { day: "수", value: 0 },
    { day: "목", value: 1 },
    { day: "금", value: 3 },
    { day: "토", value: 2 },
    { day: "일", value: 3 },
  ],
  default: [
    { day: "월", value: 0 },
    { day: "화", value: 0 },
    { day: "수", value: 0 },
    { day: "목", value: 0 },
    { day: "금", value: 0 },
    { day: "토", value: 0 },
    { day: "일", value: 0 },
  ],
};

export const todaySchedule = [
  { time: "08:00", activity: "아침 식사 (죽) 🥣", done: true },
  { time: "10:00", activity: "치매 예방 체조 🤸", done: true },
  { time: "12:00", activity: "점심 식사 (불고기) 🍱", done: true },
  { time: "14:00", activity: "미술 치료 프로그램 🎨", done: false },
  { time: "15:30", activity: "오후 간식 (제철 과일) 🍎", done: false },
  { time: "17:30", activity: "저녁 식사 🍲", done: false },
];

export const calendarLogs = {
  "2025-11-25": {
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
  "2025-11-24": {
    mood: "좋음 😊",
    notes: [
      { title: "면회", content: "따님분이 오셔서 귤을 전해주고 가셨습니다." },
      { title: "수면", content: "낮잠을 1시간 정도 푹 주무셨습니다." },
    ],
  },
  "2025-11-20": {
    mood: "보통 🙂",
    notes: [
      {
        title: "수면",
        content: "새벽에 두 번 정도 깨서 화장실을 다녀오셨습니다.",
      },
      { title: "건강", content: "혈압이 약간 높게 나와서 안정을 취했습니다." },
    ],
  },
};

export const communityPosts = [
  {
    id: 1,
    category: "공지",
    title: "📢 겨울철 독감 예방접종 안내",
    content:
      "다가오는 12월 1일부터 어르신들 대상으로 독감 예방접종이 실시됩니다.",
    date: "2025.11.25",
    likes: 56,
    comments: 0,
    isNotice: true,
  },
  {
    id: 2,
    category: "자유",
    title: "어머님이 오늘 노래자랑 1등 하셨대요! 🎉",
    content: "사진 올라온 거 보고 깜짝 놀랐네요 ㅎㅎ",
    date: "2025.11.24",
    likes: 120,
    comments: 8,
    isNotice: false,
  },
  {
    id: 3,
    category: "질문",
    title: "혹시 간식으로 과일 보내드려도 되나요?",
    content: "제철 귤을 좀 보내드리고 싶은데...",
    date: "2025.11.23",
    likes: 5,
    comments: 3,
    isNotice: false,
  },
  {
    id: 4,
    category: "자유",
    title: "요양보호사 선생님들 정말 감사합니다 ㅠㅠ",
    content: "어제 어머니 생신 챙겨주신 사진 보고 눈물이 핑 돌았어요.",
    date: "2025.11.22",
    likes: 88,
    comments: 15,
    isNotice: false,
  },
];
