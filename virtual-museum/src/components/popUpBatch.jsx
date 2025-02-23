import { useEffect } from "react";

const BatchPopup = ({ image, message, onClose }) => {
  useEffect(() => {

    // Close only when clicking outside the popup
    const handleClickOutside = (event) => {
      if (!event.target.closest(".popup-container")) {
        onClose();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      {/* Overlay for semi-transparent effect */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.5)", // Dark overlay
          zIndex: 1999, // Just below the popup
        }}
      />

      <div
        className="popup-container"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          borderRadius: "50%",
          width: "300px",
          height: "300px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2000, // Higher to ensure visibility
          padding: "10px",
        }}
      >
        <span
          style={{
            fontSize: "28px",
            marginTop: "5px",
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: "#fff",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
            background: "black",
            padding: "5px 10px",
            borderRadius: "8px",
          }}
        >
          {message}
        </span>
        <img
          src={image}
          alt="Herb Icon"
          style={{
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          }}
        />
      </div>
    </>
  );
};

export default BatchPopup;
