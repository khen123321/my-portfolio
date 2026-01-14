export default function Navbar() {
  return (
    <nav style={{
      position: "sticky",
      top: 0,
      background: "#ffffff",
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      zIndex: 1000
    }}>
      <strong>Khen Verson</strong>
      <div style={{ display: "flex", gap: "20px" }}>
        <a href="#home">Home</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  )
}
