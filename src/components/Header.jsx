export default function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Today's Mood Dashboard</h1>
      <div style={styles.date}>{new Date().toLocaleDateString()}</div>
    </header>
  );
}

const styles = {
  header: {
    width: "100%",
    padding: "16px 24px",
    background: "#FFFFFF",
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 999,
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#444",
  },
  date: { fontSize: "16px", color: "#777" },
};
