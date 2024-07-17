import React from "react";
import { ImProfile } from "react-icons/im";
import RenderRating from "../Util/RenderRating";
import { Author } from "../../../../Models/Author";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface AuthorCardInterface {
  author: Author;
}

const AuthorCard: React.FC<AuthorCardInterface> = ({ author }) => {
  return (
    <div
      className="card text-black"
      style={{
        maxWidth: "30%",
        marginLeft: "10px",
        marginBottom: "5px",
        marginTop: "5px",
        backgroundColor: "rgb(255,248,220)",
        border: "0.25vw solid rgb(255,248,220)",
      }}
    >
      <img
        src={author.urlAvt}
        className="card-img-top"
        alt="Avatar"
        style={{ width: "100%", height: "50%", objectFit: "cover" }}
      />

      <div className="card-body" style={{ padding: "1%" }}>
        <div className="text-center">
          <a
            href="#"
            className="card-title"
            style={{ textDecoration: "none", fontSize: "1.5vw" }}
          >
            {author.authorName}
          </a>
          <p className="text-muted mb-4" style={{ fontSize: "1vw" }}>
            {author.authorMaxim}
          </p>
        </div>

        <div style={{ marginTop: "-1vw" }}>
          <div
            className="d-flex justify-content-between"
            style={{ fontSize: "0.8vw" }}
          >
            <span>Thể loại chính</span>
            <span>$5,999</span>
          </div>
          <div
            className="d-flex justify-content-between"
            style={{ fontSize: "0.8vw" }}
          >
            <span>Số lượng sách</span>
            <span>$999</span>
          </div>
          <div
            className="d-flex justify-content-between"
            style={{ fontSize: "0.8vw" }}
          >
            <span>Quốc tịch</span>
            <span>$199</span>
          </div>
        </div>

        <div
          className="d-flex justify-content-between total font-weight-bold"
          style={{ fontSize: "0.5rem", marginTop: "0vh" }}
        >
          <div style={{}}>
            <RenderRating
              rating={
                author?.authorRating !== undefined ? author.authorRating : 0
              }
            />
          </div>

          <div style={{}}>
            <FavoriteIcon
              onClick={() => {}}
              style={{
                fontSize: "2rem",
                color: "rgb(210,180,140)",
              }}
            />
            <Link to={`/author/details/${author.authorID}`}>
              <ImProfile
                style={{
                  fontSize: "1.7rem",
                  color: "rgb(210,180,140)",
                }}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
