import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import { Author } from "../../../../Models/Author";
import { getAuthorById } from "../../../../Api/AuthorApi";
import ReactCountryFlag from "react-country-flag";
import RenderRating from "../Util/RenderRating";
import BookCard from "../Book/BookCard";
import GenresCard from "../Genres/GenresCard";
import RelatedBooks from "../Book/RelatedBook";
import Heading from "../Util/Heading";
import AuthorCard from "./AuthorCard";
import RelatedAuthor from "../Genres/RelatedGenres";
import RelatedGenres from "../Genres/RelatedGenres";

interface AuthorDetailsInterface {
  authorID: number;
}

const AuthorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const idNumber = Number(id);
  const [author, setAuthor] = useState<Author | undefined>();

  useEffect(() => {
    getAuthorById(idNumber)
      .then((authors) => {
        setAuthor(authors);
      })
      .catch((error) => {
        console.error("Error fetching author list:", error);
      });
  }, [idNumber]);

  return (
    <div
      style={{
        backgroundColor: "rgb(255,248,220)",
        width: "100vw",
        position: "relative",
        height: "auto",
        overflow: "hidden",
      }}
    >
      <MDBContainer style={{ marginTop: "5vw" }}>
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            {author && (
              <MDBCard>
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: "#000", height: "200px" }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "150px" }}
                  >
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                      alt="Generic placeholder image"
                      className="mt-4 mb-2 img-thumbnail"
                      fluid
                      style={{ width: "150px", zIndex: "1" }}
                    />
                  </div>
                  <div className="ms-3" style={{ marginTop: "130px" }}>
                    <MDBTypography style={{ fontSize: "30px" }} tag="h5">
                      {author.authorName}
                    </MDBTypography>
                    <MDBCardText style={{ marginTop: "5px" }}>
                      -- {author.authorMaxim} --
                    </MDBCardText>
                  </div>
                </div>
                <div
                  className="p-4 text-black"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <MDBCardText className="mb-1 h5">253</MDBCardText>
                      <MDBCardText className="small text-mute d mb-0">
                        Số lượng thể loại
                      </MDBCardText>
                    </div>
                    <div className="px-3">
                      <MDBCardText className="mb-1 h5">1026</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Số lượng sách
                      </MDBCardText>
                    </div>
                    <div>
                      <RenderRating
                        rating={
                          author.authorRating !== undefined
                            ? author.authorRating
                            : 0
                        }
                      />
                      <MDBCardText className="small text-muted mb-0">
                        Đánh giá
                      </MDBCardText>
                    </div>
                  </div>
                </div>
                <MDBCardBody className="text-black p-4">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">Thông tin</p>
                    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                      <MDBCardText className="font-italic mb-1">
                        Ngày Sinh : 15 Tháng 5, 1978{" "}
                      </MDBCardText>
                      <MDBCardText className="font-italic mb-1">
                        Quốc Tịch: Hoa Kỳ{" "}
                        <ReactCountryFlag countryCode="US" svg />
                      </MDBCardText>
                      <MDBCardText className="font-italic mb-0">
                        Thông Tin Khác : John Smith tốt nghiệp thạc sĩ khoa báo
                        chí tại đại học NewYork
                      </MDBCardText>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div>
        <div>
          <Heading text="Dánh sách sách nổi bật" />
        </div>
        <div>
          <RelatedBooks />
        </div>
        <div>
          <Heading text="Dánh sách thể loại sáng tác" />
          <RelatedGenres />
        </div>
      </div>
    </div>
  );
};

export default AuthorDetails;
