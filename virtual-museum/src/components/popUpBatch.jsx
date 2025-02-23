import { useEffect } from "react";

const BatchPopup = ({ image, message, onClose }) => {
  useEffect(() => {
		console.log("popup");
    const handleClick = () => {
      onClose();
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
				transform: "translate(-50%, -50%)",
        background: "transparent",
        borderRadius: "50%",
        width: "300px",
        height: "300px",
        boxShadow: "transparent transparent transparent transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
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
    				textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)"

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
  );
};

export default BatchPopup;