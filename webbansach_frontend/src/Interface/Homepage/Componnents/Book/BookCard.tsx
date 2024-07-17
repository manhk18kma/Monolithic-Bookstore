import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import exp from "constants";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { GoHeartFill } from "react-icons/go";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import Book from "../../../../Models/Book";
import Image from "../../../../Models/Image";
import { getAvtBookById } from "../../../../Api/ImagesApi";
import { Author } from "../../../../Models/Author";
import Genres from "../../../../Models/Genres";
import { getAllAuthorOfBook } from "../../../../Api/AuthorApi";
import { getAllGenresOfBook } from "../../../../Api/GenresApi";
import { getIdUserByToken } from "../../../../Authentication/JwtService";
import { useAuthenticationContext } from "../../../../Authentication/AuthenticationContext";
import CircularIndeterminate from "../../../../Authentication/CircularProcess";

import HeartBrokenIcon from "@mui/icons-material/HeartBroken";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const navigate = useNavigate();
  const authenticationContext = useAuthenticationContext();

  const [loadingFavouriteBook, setLoadingFavouriteBook] =
    React.useState<boolean>(false);
  const [avtImg, setAtvImg] = React.useState<Image>();
  React.useEffect(() => {
    getAvtBookById(book.id)
      .then((image) => {
        setAtvImg(image);
      })
      .catch(() => {});
  }, []);

  const [listAuthor, setListAuthor] = React.useState<Author[]>([]);
  const [listGenres, setListGenres] = React.useState<Genres[]>([]);

  React.useEffect(() => {
    getAllGenresOfBook(book.id).then((genres) => setListGenres(genres));
  }, []);
  React.useEffect(() => {
    getAllAuthorOfBook(book.id).then((authors) => setListAuthor(authors));
  }, []);

  const [bookIdChange, setBookIdChange] = React.useState<number>(0);
  let isInclude: boolean = authenticationContext.listFavouriteBook.some(
    (bookIn) => bookIn.id === book.id,
  );

  async function handleAddListFavouriteBook(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();
    setLoadingFavouriteBook(true);

    !authenticationContext.isLoggedIn && navigate("/loginpage");
    let idUser = getIdUserByToken();
    try {
      const jsonData = {
        idBook: book.id,
        idUser: idUser,
      };

      const requestOptions: RequestInit = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      };

      console.log(requestOptions);
      const response = await fetch(
        "http://localhost:8080/book/create-favourite-book",
        requestOptions,
      );

      if (!response.ok) {
        throw new Error("Lỗi khi gửi request: " + response.statusText);
      }
      const responseData = await response.json();
      console.log("Kết quả từ server:", responseData);
    } catch (error) {
      console.error("Lỗi khi gửi JSON:", error);
    }
    setLoadingFavouriteBook(false);
    authenticationContext.setIdChanged(book.id + 1);
  }

  async function handleDeleteFavouriteBook(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();
    setLoadingFavouriteBook(true);

    !authenticationContext.isLoggedIn && navigate("/loginpage");
    let idUser = getIdUserByToken();
    try {
      const jsonData = {
        idBook: book.id,
        idUser: idUser,
      };

      const requestOptions: RequestInit = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      };

      console.log(requestOptions);
      const response = await fetch(
        "http://localhost:8080/book/delete-favourite-book",
        requestOptions,
      );

      if (!response.ok) {
        throw new Error("Lỗi khi gửi request: " + response.statusText);
      }
      const responseData = await response.json();
      console.log("Kết quả từ server:", responseData);
    } catch (error) {
      console.error("Lỗi khi gửi JSON:", error);
    }
    setLoadingFavouriteBook(false);
    authenticationContext.setIdChanged(book.id - 1);
  }

  return (
    <Card
      sx={{
        width: "24%",
        marginTop: "1vh",
        marginBottom: "1vh",
        backgroundColor: "rgb(255,248,220)",
      }}
    >
      <div>
        <Link to={`/book/detail/${book.id}`} style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              borderRadius: "5px",
              display: "inline-block",
              ":hover": {
                backgroundColor: "rgb(250,235,215)",
              },
            }}
            level="title-lg"
          >
            {book.title}
          </Typography>
        </Link>
        <br />

        <div style={{ marginTop: "0.1vh" }}>
          <div style={{ display: "inline-block" }}>
            <a href="#la-quan-trung" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  borderRadius: "5px",
                  display: "inline-block",
                  ":hover": {
                    backgroundColor: "rgb(250,235,215)",
                  },
                }}
                level="body-sm"
              >
                {listAuthor.length > 0
                  ? listAuthor[Math.floor(Math.random() * listAuthor.length)]
                      .authorName
                  : ""}
              </Typography>
            </a>
          </div>

          <div style={{ display: "inline-block", marginLeft: "0.2vw" }}>
            <Typography level="body-sm"> - </Typography>
          </div>

          <div style={{ display: "inline-block", marginLeft: "0.2vw" }}>
            <a href="#lich-su" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  borderRadius: "5px",
                  display: "inline-block",
                  ":hover": {
                    backgroundColor: "rgb(250,235,215)",
                  },
                }}
                level="body-sm"
              >
                {listGenres.length > 0
                  ? listGenres[Math.floor(Math.random() * listGenres.length)]
                      .name
                  : ""}
              </Typography>
            </a>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: "0.875rem",
            right: "1rem",
          }}
        >
          <Link to={`/book/detail/${book.id}`}>
            <IconButton
              style={{ marginTop: "0px" }}
              aria-label="bookmark Bahamas Islands"
              variant="plain"
              color="neutral"
              size="sm"
              onClick={() => {
                console.log("GoHeartFillG clicked");
              }}
            >
              <ManageSearchIcon
                style={{
                  fontSize: "30px",
                  color: "rgb(210,180,140)",
                }}
              />
            </IconButton>
          </Link>

          {/* <Link to={"/x"}> */}

          {isInclude ? (
            <IconButton
              aria-label="bookmark Bahamas Islands"
              variant="plain"
              color="neutral"
              size="sm"
              onClick={handleDeleteFavouriteBook}
            >
              {loadingFavouriteBook ? (
                <CircularIndeterminate />
              ) : (
                <HeartBrokenIcon
                  style={{
                    fontSize: "30px",
                    color: "rgb(210,180,140)",
                  }}
                />
              )}
            </IconButton>
          ) : (
            <IconButton
              aria-label="bookmark Bahamas Islands"
              variant="plain"
              color="neutral"
              size="sm"
              onClick={handleAddListFavouriteBook}
            >
              {loadingFavouriteBook ? (
                <CircularIndeterminate />
              ) : (
                <GoHeartFill
                  style={{
                    fontSize: "30px",
                    color: "rgb(210,180,140)",
                  }}
                />
              )}
            </IconButton>
          )}

          {/* </Link> */}
        </div>
      </div>

      <Link to={`/book/detail/${book.id}`}>
        <AspectRatio minHeight="120px" maxHeight="200px">
          <img src={avtImg?.urlImg} loading="lazy" alt="" />
        </AspectRatio>
      </Link>

      <div
        style={{ marginTop: "0.4vw", display: "flex", alignItems: "center" }}
      >
        <div style={{ marginRight: "11%", marginLeft: "0.1vw" }}>
          <span
            style={{
              fontSize: "0.7vw",
              textDecoration: "line-through",
              marginRight: "0vw",
            }}
          >
            $2,900
          </span>
          <span style={{ fontSize: "1.4vw" }}>$2,900</span>
        </div>

        <div style={{ marginLeft: "0.9vw" }}>
          <AddShoppingCartIcon
            sx={{
              borderRadius: "5px",
              ":hover": {
                backgroundColor: "rgb(250, 235, 215)",
              },
            }}
            onClick={() => {}}
            style={{
              fontSize: "1.5vw",
              cursor: "pointer",
              marginRight: "0vw",
            }}
          />
          <Button
            style={{ marginLeft: "1vw" }}
            variant="solid"
            size="md"
            color="primary"
            aria-label="Explore Bahamas Islands"
            sx={{
              fontWeight: "600",
              backgroundColor: "rgb(210,180,140)",
              ":hover": {
                backgroundColor: "rgb(154,205,50)",
              },
            }}
          >
            Mua
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BookCard;
