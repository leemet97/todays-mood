import React, { useState } from "react";
import styled from "styled-components";
import {
  FaPen,
  FaHeart,
  FaRegCommentDots,
  FaBullhorn,
  FaTimes,
} from "react-icons/fa";
import { communityPosts } from "../data/mockData"; // 가짜 데이터 불러오기

// 1. 전체 레이아웃
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 50px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  h2 {
    font-size: 28px;
    color: #333;
    margin: 0;
  }
  span {
    color: #ff9f43;
  }
`;

const WriteButton = styled.button`
  background-color: #ff9f43;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.2s;
  font-family: "Jua", sans-serif;

  &:hover {
    transform: translateY(-2px);
    background-color: #ff8c24;
  }
`;

const TabMenu = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  background: ${(props) => (props.$active ? "#333" : "#fff")};
  color: ${(props) => (props.$active ? "#fff" : "#888")};
  border: 1px solid ${(props) => (props.$active ? "#333" : "#eee")};
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-family: "Jua", sans-serif;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const PostCard = styled.div`
  background: ${(props) => (props.$isNotice ? "#FFF5EB" : "white")};
  border: ${(props) => (props.$isNotice ? "1px solid #FFE0B2" : "none")};
  padding: 25px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  }
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  .category {
    font-size: 14px;
    color: #ff9f43;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .date {
    font-size: 13px;
    color: #aaa;
  }
`;

const PostTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 18px;
  color: #333;
`;

const PostContent = styled.p`
  color: #666;
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostFooter = styled.div`
  display: flex;
  gap: 15px;
  color: #999;
  font-size: 14px;
  div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .active {
    color: #ff6b6b;
  }
`;

// --- 🌟 모달(팝업창) 스타일 추가 ---
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 반투명 검정 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: 90%;
  max-width: 500px;
  padding: 30px;
  border-radius: 20px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #aaa;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #555;
  }
  input,
  select,
  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 10px;
    font-size: 16px;
    font-family: "Jua", sans-serif;
    box-sizing: border-box; /* 패딩 포함 크기 계산 */
  }
  textarea {
    height: 150px;
    resize: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #ff9f43;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  font-family: "Jua", sans-serif;
  &:hover {
    background-color: #ff8c24;
  }
`;

// ==========================================

const Community = () => {
  const [activeTab, setActiveTab] = useState("전체");
  const [posts, setPosts] = useState(communityPosts); // 게시글 목록 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태

  // 글쓰기 입력값 상태
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "자유",
  });

  // 1. 입력값이 변할 때 실행되는 함수
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  // 2. [등록하기] 버튼 눌렀을 때 실행되는 함수
  const handleSubmit = () => {
    if (!newPost.title || !newPost.content) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }

    // 새로운 게시글 객체 만들기
    const postToAdd = {
      id: Date.now(), // 현재 시간을 ID로 사용 (고유값)
      category: newPost.category,
      title: newPost.title,
      content: newPost.content,
      date: new Date().toLocaleDateString(), // 오늘 날짜
      likes: 0,
      comments: 0,
      isNotice: false,
    };

    // 기존 목록(posts) 맨 앞에 새 글(postToAdd) 붙이기
    setPosts([postToAdd, ...posts]);

    // 모달 닫기 & 입력창 초기화
    setIsModalOpen(false);
    setNewPost({ title: "", content: "", category: "자유" });
    alert("게시글이 등록되었습니다! 🎉");
  };

  // 탭 필터링 로직
  const filteredPosts =
    activeTab === "전체"
      ? posts
      : posts.filter((post) => post.category === activeTab);

  return (
    <Container>
      <Header>
        <h2>
          보호자 <span>소통광장 💬</span>
        </h2>
        {/* 글쓰기 버튼 누르면 모달 열기 */}
        <WriteButton onClick={() => setIsModalOpen(true)}>
          <FaPen /> 글쓰기
        </WriteButton>
      </Header>

      <TabMenu>
        {["전체", "공지", "자유", "질문"].map((tab) => (
          <Tab
            key={tab}
            $active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Tab>
        ))}
      </TabMenu>

      <PostList>
        {filteredPosts.map((post) => (
          <PostCard key={post.id} $isNotice={post.isNotice}>
            <PostHeader>
              <span className="category">
                {post.isNotice && <FaBullhorn />} {post.category}
              </span>
              <span className="date">{post.date}</span>
            </PostHeader>
            <PostTitle>{post.title}</PostTitle>
            <PostContent>{post.content}</PostContent>
            <PostFooter>
              <div className="active">
                <FaHeart /> {post.likes}
              </div>
              <div>
                <FaRegCommentDots /> {post.comments}
              </div>
            </PostFooter>
          </PostCard>
        ))}
      </PostList>

      {/* 🌟 글쓰기 모달 (isModalOpen이 true일 때만 보임) */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          {/* 모달 내용 클릭 시 닫히지 않게 stopPropagation */}
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setIsModalOpen(false)}>
              <FaTimes />
            </CloseButton>
            <h2 style={{ marginTop: 0, color: "#333" }}>새 글 쓰기 ✏️</h2>

            <InputGroup>
              <label>카테고리</label>
              <select
                name="category"
                value={newPost.category}
                onChange={handleInputChange}
              >
                <option value="자유">자유</option>
                <option value="질문">질문</option>
              </select>
            </InputGroup>

            <InputGroup>
              <label>제목</label>
              <input
                type="text"
                name="title"
                placeholder="제목을 입력하세요"
                value={newPost.title}
                onChange={handleInputChange}
              />
            </InputGroup>

            <InputGroup>
              <label>내용</label>
              <textarea
                name="content"
                placeholder="따뜻한 이야기를 나누어보세요"
                value={newPost.content}
                onChange={handleInputChange}
              />
            </InputGroup>

            <SubmitButton onClick={handleSubmit}>등록 완료</SubmitButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Community;
