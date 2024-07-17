import React from "react";

interface HeadingProps {
  text: string;
}

const Heading: React.FC<HeadingProps> = ({ text }) => {
  let textDisplay = text.trim(); // Sử dụng trim để loại bỏ khoảng trắng thừa
  return (
    <div
      style={{
        display: "inline-block",
        backgroundColor: "rgb(210,180,140)",
        borderRadius: "10px",
        marginTop: "10px",
        marginLeft: "10vw",
        padding: "10px",
      }}
    >
      <h1 className="display-6" style={{ fontSize: "24px" }}>
        {textDisplay}
      </h1>
    </div>
  );
};

export default Heading;
