import BookCard from "./BookCard";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Button } from "react-bootstrap";

const RelatedBooks = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between", // Chia đều khoảng cách và đẩy các thành phần đầu và cuối ra mép
        alignItems: "center", // Hiển thị từ giữa theo trục dọc
        width: "80vw",
        height: "auto",
        backgroundColor: "rgb(210,180,140)",
        borderRadius: "10px",
        marginTop: "10px",
        marginLeft: "10vw",
      }}
    >
      <Button
        style={{
          marginTop: "2vw",
          minWidth: "auto",
          padding: "0px",
          marginBottom: "2vw",
          backgroundColor: "rgb(210,180,140)",
          borderColor: "white",
          marginLeft: "2px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <KeyboardArrowLeftIcon style={{ fontSize: "2vw" }} />
        </div>
      </Button>

      {/* <BookCard />
      <BookCard />
      <BookCard />
      <BookCard /> */}

      <Button
        style={{
          marginTop: "2vw",
          maxWidth: "auto",
          padding: "0px",
          marginBottom: "2vw",
          backgroundColor: "rgb(210,180,140)",
          borderColor: "white",
          marginRight: "2px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <KeyboardArrowRightIcon style={{ fontSize: "2vw" }} />
        </div>
      </Button>
    </div>
  );
};
export default RelatedBooks;
