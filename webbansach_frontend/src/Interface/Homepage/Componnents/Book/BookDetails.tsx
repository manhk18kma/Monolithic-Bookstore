import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import RenderRating from "../Util/RenderRating";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { GoHeartFill } from "react-icons/go";
import PaidIcon from "@mui/icons-material/Paid";
import { CardContent, Typography } from "@mui/material";
import RelatedBooks from "./RelatedBook";
import Heading from "../Util/Heading";
import RelatedGenres from "../Genres/RelatedGenres";
import { Link, useParams } from "react-router-dom";
import { getBookByID } from "../../../../Api/BookApi";
import Book from "../../../../Models/Book";
import Image from "../../../../Models/Image";
import { getAllImgByBookId } from "../../../../Api/ImagesApi";
import Genres from "../../../../Models/Genres";
import { Author } from "../../../../Models/Author";
import { getAllGenresOfBook } from "../../../../Api/GenresApi";
import { getAllAuthorOfBook } from "../../../../Api/AuthorApi";
import AddComment from "./AddComment";

const BookDetails = () => {
  const [indexImg, setIndexImg] = useState(0);
  const { id } = useParams<{ id: string }>();
  const idNumber = Number(id);
  const [book, setBook] = useState<Book>();
  useEffect(() => {
    getBookByID(idNumber)
      .then((book) => {
        setBook(book);
      })
      .catch(() => {
        console.error("Error fetching author list:");
      });
  }, []);

  // Handle url related images
  const [relatedImg, setRelatedImg] = useState<Image[]>([]);
  const [avtImg, setAvtImg] = useState<Image | undefined>(undefined);

  useEffect(() => {
    getAllImgByBookId(idNumber)
      .then((imgs) => {
        const avtImgs = imgs.filter((img) => img.isAvt);
        setRelatedImg(imgs);
        if (avtImgs.length > 0) {
          setAvtImg(avtImgs[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching image list:", error);
      });
  }, []);

  const [listGenres, setListGenres] = useState<Genres[]>([]);
  const [listAuthors, setListAuthors] = useState<Author[]>([]);

  // THeloai
  useEffect(() => {
    getAllGenresOfBook(idNumber)
      .then((genres) => {
        let genresData = genres.map((gen) => gen);
        setListGenres(genresData);
      })
      .catch(() => {
        console.error("Error fetching genre list:");
      });
  }, []);
  // Tacgia
  useEffect(() => {
    getAllAuthorOfBook(idNumber)
      .then((authors) => {
        let authorsData = authors.map((au) => au);
        setListAuthors(authorsData);
      })
      .catch(() => {
        console.error("Error fetching author list:");
      });
  }, []);

  // Handle quantity products
  const [quantityBuy, setQuantityBuy] = useState<number>(1);
  let max = 5;
  function handleMinusButton(event: any): void {
    quantityBuy > 1 && setQuantityBuy((prevState) => prevState - 1);
  }

  function handlePlusButton(event: any): void {
    quantityBuy < max && setQuantityBuy((prevState) => prevState + 1);
  }

  function handleChangeInput(event: any): void {
    console.log("change");
    const inputValue = event.target.value;
    console.log(inputValue);
    if (!/^[1-9][0-9]*$/.test(inputValue)) {
      setQuantityBuy(1);
    } else {
      setQuantityBuy(
        parseInt(inputValue, 10) > max ? max : parseInt(inputValue, 10),
      );
    }
  }

  return (
    <div
      style={{
        backgroundColor: "rgb(255,248,220)",
        marginTop: "60px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column", // Thêm thuộc tính này để sắp xếp theo chiều dọ
        padding: "10px",
      }}
    >
      <div
        className="gradient-custom-2"
        style={{
          width: "80vw",
          height: "30%",
          backgroundColor: "rgb(210,180,140)",
          borderRadius: "10px",
          marginTop: "3vh",
          marginLeft: "10vw",
          marginBottom: "10px",
        }}
      >
        <section className="py-5">
          <div className="container">
            <div className="row gx-5">
              {/* Aside */}
              <aside className="col-lg-6">
                <div
                  className="border rounded-4 mb-3 d-flex justify-content-center"
                  style={{ backgroundColor: "rgb(255,248,220)", width: "auto" }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "60vh",
                      margin: "auto",
                    }}
                    className="rounded-4 fit"
                    src={
                      relatedImg && relatedImg[indexImg]
                        ? relatedImg[indexImg].urlImg
                        : avtImg
                          ? avtImg.urlImg
                          : ""
                    }
                    alt="Product"
                  />
                </div>

                <div
                  className="d-flex justify-content-center mb-3 "
                  style={{
                    backgroundColor: "rgb(255,248,220)",
                    width: "auto",
                    borderRadius: "10px",
                  }}
                >
                  <Button
                    onClick={() => {
                      setIndexImg((prevIndex) =>
                        prevIndex === 0 ? relatedImg.length - 1 : prevIndex - 1,
                      );
                    }}
                    style={{
                      marginTop: "25px",
                      minWidth: "auto",
                      padding: "0px",
                      marginRight: "3px",
                      marginBottom: "20px",
                      backgroundColor: "rgb(210,180,140)",
                      borderColor: "white",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <KeyboardArrowLeftIcon style={{ fontSize: "30px" }} />
                    </div>
                  </Button>

                  {relatedImg.map((img, index) => (
                    <img
                      key={index}
                      onMouseEnter={() => {
                        setIndexImg(index);
                      }}
                      width={index === indexImg ? 70 : 60}
                      height={index === indexImg ? 90 : 80}
                      className="rounded-2"
                      src={img.urlImg}
                      style={{
                        marginRight: "3px",
                        border:
                          index === indexImg
                            ? "2px solid black"
                            : "2px solid transparent",
                      }}
                    />
                  ))}

                  <Button
                    onClick={() => {
                      setIndexImg((prevIndex) =>
                        prevIndex === relatedImg.length - 1 ? 0 : prevIndex + 1,
                      );
                    }}
                    style={{
                      marginTop: "25px",
                      maxWidth: "auto",
                      padding: "0px",
                      marginBottom: "20px",
                      backgroundColor: "rgb(210,180,140)",
                      borderColor: "white",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <KeyboardArrowRightIcon style={{ fontSize: "30px" }} />
                    </div>
                  </Button>
                </div>
                {/* Thumbs-wrap */}
                {/* Gallery-wrap */}
              </aside>
              {/* Aside */}

              {/* Main */}
              <main className="col-lg-6">
                <div className="ps-lg-3">
                  <h2
                    className="title text-dark"
                    style={{
                      backgroundColor: "rgb(255,248,220)",
                      borderRadius: "10px",
                      display: "inline-block",
                      padding: "5px",
                    }}
                  >
                    {book?.title}
                  </h2>

                  <div className="d-flex flex-row my-3">
                    <div
                      className="text-warning mb-1 me-2"
                      style={{
                        backgroundColor: "rgb(255,248,220)",
                        borderRadius: "10px",
                        display: "inline-block",
                        padding: "2px",
                        marginTop: "-10px",
                      }}
                    >
                      <RenderRating rating={book?.rating ? book.rating : 0} />
                    </div>
                    <div
                      className="text-warning mb-1 me-2"
                      style={{
                        backgroundColor: "rgb(255,248,220)",
                        borderRadius: "10px",
                        display: "inline-block",
                        padding: "2px",
                        marginTop: "-10px",
                      }}
                    >
                      <span
                        className="text-muted"
                        style={{
                          backgroundColor: "rgb(255,248,220)",
                          borderRadius: "10px",
                          display: "inline-block",
                        }}
                      >
                        <i className="fas fa-shopping-basket fa-sm mx-1"></i>
                        {book?.soldQuantity}
                      </span>
                    </div>
                  </div>

                  <div
                    className="mb-3"
                    style={{
                      backgroundColor: "rgb(255,248,220)",
                      borderRadius: "10px",
                      display: "inline-block",
                      padding: "5px",
                      marginTop: "-15px",
                    }}
                  >
                    <span
                      className="h5"
                      style={{
                        color: "#3b71ca",
                        marginRight: "10px",
                        textDecoration: "line-through",
                      }}
                    >
                      {book?.listedPrice}
                    </span>
                    <span className="h5" style={{ color: "#3b71ca" }}>
                      {book?.price}
                    </span>
                    <span className="text-muted">/per book</span>
                  </div>

                  <br />
                  <p
                    style={{
                      backgroundColor: "rgb(255,248,220)",
                      borderRadius: "10px",
                      display: "inline-block",
                      padding: "5px",
                      marginTop: "10px",
                    }}
                  >
                    {book?.description}
                  </p>

                  <div
                    className="row"
                    style={{
                      backgroundColor: "rgb(255,248,220)",
                      borderRadius: "10px",
                      padding: "5px",
                      marginTop: "-1px",
                      marginLeft: "1px",
                      marginRight: "1px",
                    }}
                  >
                    {/* Genres */}
                    <dt className="col-3">Genres</dt>
                    <dd className="col-9">
                      {listGenres.map((gen, index) => (
                        <Link
                          to="/test"
                          key={index}
                          style={{ textDecoration: "none" }}
                        >
                          <span
                            style={{
                              marginRight: "5px",
                              borderRadius: "5px",
                              display: "inline-block",
                              backgroundColor: "rgb(250,235,215)",
                            }}
                          >
                            {gen.name}
                          </span>
                        </Link>
                      ))}
                    </dd>
                    {/* Author */}
                    <dt className="col-3">Author</dt>
                    <dd className="col-9">
                      {listAuthors.map((author, index) => (
                        <Link
                          key={index}
                          to={"/test"}
                          style={{ textDecoration: "none" }}
                        >
                          <span
                            style={{
                              marginRight: "5px",
                              borderRadius: "5px",
                              display: "inline-block",
                              backgroundColor: "rgb(250,235,215)",
                            }}
                          >
                            {author.authorName}
                          </span>
                        </Link>
                      ))}
                    </dd>

                    <dt className="col-3">Pages</dt>
                    <dd className="col-9">1412</dd>

                    <dt className="col-3">Publishing</dt>
                    <dd className="col-9">Book store</dd>

                    <dt className="col-3">Translator</dt>
                    <dd className="col-9">Google</dd>
                  </div>

                  <div
                    className="mb-3"
                    style={{
                      backgroundColor: "rgb(255,248,220)",
                      borderRadius: "10px",
                      display: "inline-block",
                      padding: "5px",
                      marginTop: "21px",
                    }}
                  >
                    <span className="h7">Quantity : {book?.quantity}</span>
                  </div>

                  <div
                    className="input-group mb-3"
                    style={{
                      width: "170px",
                      marginTop: "-10px",
                      borderRadius: "10px",
                      border: "2px solid rgb(255,248,220)",
                    }}
                  >
                    <button
                      className="btn btn-white border border-secondary px-3"
                      type="button"
                      id="button-addon1"
                      data-mdb-ripple-color="dark"
                      style={{ backgroundColor: "rgb(210,180,140)" }}
                      onClick={handleMinusButton}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <input
                      onChange={handleChangeInput}
                      type="number"
                      className="form-control text-center border border-secondary"
                      placeholder="14"
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
                      value={quantityBuy}
                    />
                    <button
                      className="btn btn-white border border-secondary px-3"
                      type="button"
                      id="button-addon2"
                      data-mdb-ripple-color="dark"
                      style={{ backgroundColor: "rgb(210,180,140)" }}
                      onClick={handlePlusButton}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>

                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      backgroundColor: "rgb(210,180,140)",
                      marginRight: "5px",
                      borderRadius: "10px",
                      border: "2px solid rgb(255,248,220)",
                      marginTop: "-4px",
                    }}
                  >
                    <PaidIcon /> Buy now
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      backgroundColor: "rgb(210,180,140)",
                      marginRight: "5px",
                      borderRadius: "10px",
                      border: "2px solid rgb(255,248,220)",
                      marginTop: "-4px",
                    }}
                  >
                    <AddShoppingCartIcon /> Add
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      backgroundColor: "rgb(210,180,140)",
                      borderRadius: "10px",
                      border: "2px solid rgb(255,248,220)",
                      marginTop: "-4px",
                    }}
                  >
                    <GoHeartFill style={{}} /> Add
                  </Button>
                </div>
              </main>
              {/* Main */}
            </div>
          </div>
        </section>
      </div>
      <div>
        <AddComment idBook={book?.id ? book.id : 0} />
      </div>
      <div style={{ marginLeft: "0vw" }}>
        <Heading text="Danh Sách Sách Liên Quan" />
      </div>

      <div>
        <RelatedBooks />
      </div>
    </div>
  );
};

export default BookDetails;
