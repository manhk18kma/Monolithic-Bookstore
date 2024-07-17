import { Carousel } from "react-bootstrap";
interface CarouselALlInterface {
  urlImg: string;
  urlImgCarousel: string[];
}

const CarouselAll: React.FC<CarouselALlInterface> = ({
  urlImg,
  urlImgCarousel,
}) => {
  return (
    <div
      style={{
        width: "80vw",
        maxHeight: "40vh",
        margin: "10px 10vw",
        borderRadius: "20px",
        backgroundColor: "rgb(210,180,140)",
        overflow: "hidden",
        display: "flex",
      }}
    >
      <div
        style={{
          width: "35%",
          height: "100%",
          marginRight: "auto",
          marginTop: "15px",
          borderRadius: "20px", // bo tròn góc cho cả 4 góc
          borderBottomRightRadius: "0px", // bo tròn góc dưới bên phải
          overflow: "hidden", // Thêm overflow: hidden để đảm bảo hình ảnh không bị tràn ra ngoài div
        }}
      >
        <img
          src={urlImg}
          alt="Mô tả của logo"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <div
        style={{
          width: "60%",
          height: "100%",
          marginLeft: "auto",
          marginTop: "15px",
        }}
      >
        <Carousel
          style={{ width: "100%", height: "100%", borderRadius: "20px" }}
        >
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100 h-100"
              src={urlImgCarousel[0]}
              alt="Second slide"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                borderRadius: "20px",
                objectFit: "cover",
                overflow:
                  "hidden" /* Thêm overflow: hidden để đảm bảo ảnh không bị tràn */,
              }}
            />
          </Carousel.Item>
          <Carousel.Item interval={10000}>
            <img
              className="d-block w-100 h-100"
              src={urlImgCarousel[1]}
              alt="First slide"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                borderRadius: "20px",
                objectFit: "cover",
                overflow:
                  "hidden" /* Thêm overflow: hidden để đảm bảo ảnh không bị tràn */,
              }}
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 h-100"
              src={urlImgCarousel[2]}
              alt="Third slide"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                borderRadius: "20px",
                objectFit: "cover",
                overflow:
                  "hidden" /* Thêm overflow: hidden để đảm bảo ảnh không bị tràn */,
              }}
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};
export default CarouselAll;
