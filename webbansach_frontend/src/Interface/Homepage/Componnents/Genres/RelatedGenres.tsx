import { Button } from "react-bootstrap";
import GenresCard from "./GenresCard";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
const RelatedGenres = () => {
  return (
    <div
      className="container"
      style={{
        width: "70vw",
        height: "auto",
        margin: "10px auto",
        borderRadius: "20px",
        backgroundColor: "rgb(210,180,140)",
        overflow: "hidden",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
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
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <KeyboardArrowLeftIcon style={{ fontSize: "2vw" }} />
        </div>
      </Button>
      <GenresCard />
      <GenresCard />
      <GenresCard />
      {/* <GenresCard /> */}

      <Button
        style={{
          marginTop: "2vw",
          maxWidth: "auto",
          padding: "0px",
          marginBottom: "2vw",
          backgroundColor: "rgb(210,180,140)",
          borderColor: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <KeyboardArrowRightIcon style={{ fontSize: "2vw" }} />
        </div>
      </Button>
    </div>
  );
};
export default RelatedGenres;
