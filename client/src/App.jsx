import { useState } from "react";
import Popup from "./pages/Popup";
import Options from "./pages/Options";

function App() {
  const [currentPage, setCurrentPage] = useState("popup");

  const togglePage = () => {
    setCurrentPage((prev) => (prev === "popup" ? "options" : "popup"));
  };

  return (
    <div style={{ padding: "10px" }}>
      {currentPage === "popup" ? <Popup /> : <Options />}
      <button
        onClick={togglePage}
        style={{
          marginTop: "20px",
          padding: "8px 16px",
          cursor: "pointer",
        }}
      >
        {currentPage === "popup" ? "Options" : "Back"}
      </button>
    </div>
  );
}

export default App;
