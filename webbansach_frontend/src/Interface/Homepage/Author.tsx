import React, { useEffect, useState } from "react";
import Heading from "./Componnents/Util/Heading";
import CarouselAll from "./Componnents/Util/CarouselAll";
import { Author } from "../../Models/Author";
import { getAllAuthors } from "../../Api/AuthorApi";
import AuthorCard from "./Componnents/Author/AuthorCard";
import PaginationRounded from "./Componnents/Util/Pagination";

const Authors = () => {
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
    "https://anybooks.vn/uploads/images/nhung-tac-pham-van-hoc-noi-tieng-cua-nha-van-nguyen-trai-1.jpg",
    "https://i.ytimg.com/vi/VZoYbcsfMAI/maxresdefault.jpg",
    "https://sachhay24h.com/uploads/images/nhung-tac-pham-noi-tieng-cua-bac-ho.jpg",
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
      <Heading text="Danh Sách Các Tác Giả Nổi Bật" />
      <CarouselAll urlImg={urlImg} urlImgCarousel={UrlCarouselImg} />

      <div>
        <Heading text="Danh Sách Các Tác Giả" />
      </div>
      <div>
        <PaginationRounded />
      </div>

      <div
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
        {authorList.map((author) => (
          <AuthorCard key={author.authorID} author={author} />
        ))}
      </div>

      <div>
        <PaginationRounded />
      </div>
    </div>
  );
};

export default Authors;
