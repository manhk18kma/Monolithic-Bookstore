import React, { useEffect, useState } from "react";
import Heading from "./Componnents/Util/Heading";
import CarouselAll from "./Componnents/Util/CarouselAll";
import Footer from "../Footer/Footer";
import CircularIndeterminate from "../../Authentication/CircularProcess";
import { useLocation } from "react-router-dom";
import Book from "../../Models/Book";
import { get3BestSoldBooks, get3RecentBooks } from "../../Api/BookApi";
import CarouselBook from "./Componnents/Util/Carousels/CarouselBook";
import Image from "../../Models/Image";
import { getAvtBookById } from "../../Api/ImagesApi";

const HomePage: React.FC = () => {
  let urlImgDiscount: string =
    "https://www.shutterstock.com/shutterstock/photos/2433578979/display_1500/stock-vector-book-store-concept-men-and-women-near-bookstore-clients-and-customers-buying-books-textbooks-and-2433578979.jpg";
  let urlImgEvent: string =
    "https://images.adsttc.com/media/images/573c/90c0/e58e/ce1e/1600/0007/large_jpg/Here_is_a_theater_to_unfold_an_outstanding_drama__and_the_characters_are_book_lovers_sitting_on_the_soft_couch_or_standing_beside_the_bookshelves._0004.jpg?1463587001";
  let urlImgAward: string =
    "https://www.shutterstock.com/shutterstock/photos/2433578979/display_1500/stock-vector-book-store-concept-men-and-women-near-bookstore-clients-and-customers-buying-books-textbooks-and-2433578979.jpg";

  let UrlCarouselImgDiscount: string[] = [
    "https://www.shutterstock.com/shutterstock/photos/1790872166/display_1500/stock-vector-promo-sale-banner-for-library-bookshop-and-bookstore-a-large-number-of-books-stacked-in-piles-1790872166.jpg",
    "https://www.shutterstock.com/shutterstock/photos/1790872166/display_1500/stock-vector-promo-sale-banner-for-library-bookshop-and-bookstore-a-large-number-of-books-stacked-in-piles-1790872166.jpg",
    "https://www.shutterstock.com/shutterstock/photos/1790872166/display_1500/stock-vector-promo-sale-banner-for-library-bookshop-and-bookstore-a-large-number-of-books-stacked-in-piles-1790872166.jpg",
  ];
  let UrlCarouselImgEvnet: string[] = [
    "https://img.freepik.com/free-vector/flat-world-book-day-social-media-cover-template_23-2149337464.jpg?size=626&ext=jpg&ga=GA1.1.1049856054.1709695818&semt=ais",
    "https://img.freepik.com/free-vector/literature-book-club-social-media-cover-template_23-2149726663.jpg?size=626&ext=jpg&ga=GA1.1.1049856054.1709695818&semt=ais",
    "https://img.freepik.com/premium-vector/hand-drawn-book-club-facebook-cover_23-2149691121.jpg?size=626&ext=jpg&ga=GA1.1.1049856054.1709695818&semt=ais",
  ];
  let UrlCarouselImgAward: string[] = [
    "https://www.shutterstock.com/shutterstock/photos/1790872166/display_1500/stock-vector-promo-sale-banner-for-library-bookshop-and-bookstore-a-large-number-of-books-stacked-in-piles-1790872166.jpg",
    "https://www.shutterstock.com/shutterstock/photos/1790872166/display_1500/stock-vector-promo-sale-banner-for-library-bookshop-and-bookstore-a-large-number-of-books-stacked-in-piles-1790872166.jpg",
    "https://www.shutterstock.com/shutterstock/photos/1790872166/display_1500/stock-vector-promo-sale-banner-for-library-bookshop-and-bookstore-a-large-number-of-books-stacked-in-piles-1790872166.jpg",
  ];

  //lấy ra 3 sách mới nhất
  const [mostRecentBooks, setMostRecentBooks] = useState<Book[]>([]);
  const [mostRecentAvts, setMostRecentAtvs] = useState<Image[]>([]);
  useEffect(() => {
    get3RecentBooks()
      .then((books) => {
        setMostRecentBooks(books);
        return Promise.all(books.map((book) => getAvtBookById(book.id)));
      })
      .then((images) => {
        setMostRecentAtvs(images);
      })
      .catch((error) => {
        console.error("Error fetching book list:", error);
      });
  }, []);

  //lấy ra 3 sách bán chạy nhất
  const [bestSellingBooks, setBestSellingBooks] = useState<Book[]>([]);
  const [bestSellingAvt, setBestSellingAvt] = useState<Image[]>([]);
  useEffect(() => {
    get3BestSoldBooks()
      .then((books) => {
        setBestSellingBooks(books);
        return Promise.all(books.map((book) => getAvtBookById(book.id)));
      })
      .then((images) => {
        setBestSellingAvt(images);
      })
      .catch((error) => {
        console.error("Error fetching book list:", error);
      });
  }, []);

  console.log(bestSellingAvt);
  console.log(mostRecentAvts);

  useEffect(() => {}, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "80vh",
        height: "auto",
        overflow: "hidden",
        backgroundColor: "rgb(255,248,220)",
        marginTop: "8vh",
      }}
    >
      <>
        <Heading text="Discount event" />
        <CarouselAll
          urlImg={urlImgDiscount}
          urlImgCarousel={UrlCarouselImgDiscount}
        />

        <Heading text="Best-selling books" />
        {bestSellingBooks.length > 0 && bestSellingAvt.length && (
          <CarouselBook
            listBooks={bestSellingBooks}
            listAtvs={bestSellingAvt}
          />
        )}

        <Heading text="Most recent books" />
        {mostRecentBooks.length > 0 && mostRecentAvts.length && (
          <CarouselBook listBooks={mostRecentBooks} listAtvs={mostRecentAvts} />
        )}
      </>
    </div>
  );
};

export default HomePage;
