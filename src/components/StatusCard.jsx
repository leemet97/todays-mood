// src/components/StatusCard.jsx

export default function StatusCard({ icon, label, value }) {
  return (
    <div style={styles.card}>
      <div style={styles.icon}>{icon}</div>
      <div style={styles.label}>{label}</div>
      <div style={styles.value}>{value}</div>
    </div>
  );
}

const styles = {
  card: {
    width: "180px",
    background: "#FFFFFF",
    padding: "18px",
    borderRadius: "16px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    textAlign: "center",
    transition: "all 0.2s",
  },
  icon: {
    fontSize: "32px",
    marginBottom: "8px",
  },
  label: {
    fontSize: "15px",
    color: "#777",
    marginBottom: "5px",
  },
  value: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#444",
  },
};
