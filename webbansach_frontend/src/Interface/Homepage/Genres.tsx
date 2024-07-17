import React, { useEffect, useState } from "react";
import Heading from "./Componnents/Util/Heading";
import CarouselAll from "./Componnents/Util/CarouselAll";
import { Author } from "../../Models/Author";
import { getAllAuthors } from "../../Api/AuthorApi";
import AuthorCard from "./Componnents/Author/AuthorCard";
import MediaCard from "./Componnents/Genres/GenresCard";
import GenresCard from "./Componnents/Genres/GenresCard";
import PaginationRounded from "./Componnents/Util/Pagination";
import { checkToken } from "../../Authentication/JwtService";

const Genres = () => {
  const [authorList, setAuthorList] = useState<Author[]>([]);

  useEffect(() => {
    getAllAuthors()
      .then((authors) => {
        setAuthorList(authors);
      })
      .catch((error) => {
        console.error("Error fetching author list:", error);
      });
  }, []);

  let urlImg: string =
    "https://www.writestuffresources.com/wp-content/uploads/2013/07/Author_1040x660-e1411016083628-1-1040x660.jpg";
  let UrlCarouselImg: string[] = [
    "https://www.shutterstock.com/shutterstock/photos/1790872166/display_1500/stock-vector-promo-sale-banner-for-library-bookshop-and-bookstore-a-large-number-of-books-stacked-in-piles-1790872166.jpg",
    "https://www.shutterstock.com/shutterstock/photos/1790872166/display_1500/stock-vector-promo-sale-banner-for-library-bookshop-and-bookstore-a-large-number-of-books-stacked-in-piles-1790872166.jpg",
    "https://www.shutterstock.com/shutterstock/photos/1485643397/display_1500/stock-vector-books-inside-shopping-cart-discount-books-web-banner-vector-illustration-1485643397.jpg",
  ];
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "auto",
        overflow: "hidden",
        backgroundColor: "rgb(255,248,220)",
        marginTop: "8vh",
      }}
    >
      <div>
        <Heading text="Danh Sách Các Tác Giả Nổi Bật" />
        <CarouselAll urlImg={urlImg} urlImgCarousel={UrlCarouselImg} />
        <div>
          <Heading text="Danh Sách Các Tác Giả" />
        </div>
        <PaginationRounded />
      </div>
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
        <GenresCard />
        <GenresCard />
        <GenresCard />
        <GenresCard />
        <GenresCard />
        <GenresCard />
        <GenresCard />
        <GenresCard />
      </div>

      <div>
        <PaginationRounded />
      </div>
    </div>
  );
};

export default Genres;
