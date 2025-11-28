// src/components/NurseNoteCard.jsx

export default function NurseNoteCard({ message }) {
  return (
    <div style={styles.card}>
      <div style={styles.title}>🧑‍⚕️ 간호사 선생님의 한마디</div>

      <div style={styles.bubble}>
        <p style={styles.text}>{message}</p>
      </div>

      <div style={styles.tail}></div>
    </div>
  );
}

const styles = {
  card: {
    background: "#FFFFFF",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: "600px",
    marginTop: "24px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "12px",
    color: "#444",
  },
  bubble: {
    background: "#F4F2ED",
    padding: "20px",
    borderRadius: "14px",
    position: "relative",
  },
  text: {
    margin: 0,
    fontSize: "15px",
    color: "#333",
    lineHeight: "1.5",
  },
  tail: {
    width: "0",
    height: "0",
    borderLeft: "12px solid #F4F2ED",
    borderTop: "12px solid transparent",
    borderBottom: "12px solid transparent",
    marginLeft: "20px",
    marginTop: "5px",
  },
};
