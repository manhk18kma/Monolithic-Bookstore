import Image from "../Models/Image";

function fetchApi(url: string): Promise<Image[]> {
  return new Promise<Image[]>((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const imgListResponse = data._embedded.hinhAnhs;
        const imageList = imgListResponse.map((img: any) => ({
          id: img.maHinhAnh,
          title: img.tenHinhAnh,
          urlImg: img.urlImage,
          isAvt: img.anhDaiDienSach,
        }));
        resolve(imageList);
      })

      .catch((error) => {
        reject(error);
      });
  });
}

export async function getAvtBookById(id: number): Promise<Image> {
  let url: string = `http://localhost:8080/hinh-anh/search/findHinhAnhBySach_MaSachAndAnhDaiDienSachIsTrue?maSach=${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const imageData = await response.json();
    const image: Image = {
      id: imageData.maHinhAnh,
      title: imageData.tenHinhAnh,
      urlImg: imageData.urlImage,
      isAvt: imageData.anhDaiDienSach,
    };
    return image;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
}

export async function getAllImgByBookId(id: number): Promise<Image[]> {
  let url: string = `http://localhost:8080/sach/${id}/danhSachHinhAnh`;
  return fetchApi(url);
}
