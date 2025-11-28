// src/components/MoodCard.jsx
export default function MoodCard({ emoji, mood, note }) {
  return (
    <div style={styles.card}>
      <div style={styles.emoji}>{emoji}</div>
      <div style={styles.title}>{mood}</div>
      <div style={styles.note}>{note}</div>
    </div>
  );
}

const styles = {
  card: {
    background: "#FFFFFF",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    width: "260px",
    textAlign: "center",
    transition: "transform 0.2s",
  },
  emoji: {
    fontSize: "48px",
    marginBottom: "12px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#444",
  },
  note: {
    fontSize: "14px",
    color: "#777",
  },
};
