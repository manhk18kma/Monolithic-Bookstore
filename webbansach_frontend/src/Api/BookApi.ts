import Book from "../Models/Book";
import { getAvtBookById } from "./ImagesApi";

function fetchApi(url: string): Promise<Book[]> {
  return new Promise<Book[]>((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const bookList: Book[] = [];
        const bookListReponse = data._embedded.saches;
        // const urlImages =
        for (const key in bookListReponse) {
          bookList.push({
            id: bookListReponse[key].maSach,
            title: bookListReponse[key].tenSach,
            description: bookListReponse[key].moTa,
            listedPrice: bookListReponse[key].giaNiemYet,
            discountPercent: bookListReponse[key].phanTramGiamGia,
            price: bookListReponse[key].giaBan,
            quantity: bookListReponse[key].soLuong,
            soldQuantity: bookListReponse[key].daBan,
            rating: bookListReponse[key].trungBinhXepHang,
          });
        }

        resolve(bookList);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function get3RecentBooks(): Promise<Book[]> {
  let url: string =
    "http://localhost:8080/sach/search/findSachesBy?sort=maSach,desc&size=3&page=0";
  return fetchApi(url);
}

export function get3BestSoldBooks(): Promise<Book[]> {
  let url: string =
    "http://localhost:8080/sach/search/findSachesBy?sort=daBan,desc&size=3&page=0";
  return fetchApi(url);
}

export function getBooks(): Promise<Book[]> {
  let url: string = "http://localhost:8080/sach";
  return fetchApi(url);
}

export function getBooksByTitle(title: any): Promise<Book[]> {
  let url: string = `http://localhost:8080/sach/search/findByTenSachContaining?tenSach=${title}&page=0&size=10`;
  return fetchApi(url);
}

export function getListFavouriteBook(idUSer: number): Promise<Book[]> {
  let url: string = `http://localhost:8080/nguoi-dung/${idUSer}/danhSachSachYeuThich`;
  return fetchApi(url);
}

export async function getBookByID(id: number): Promise<Book> {
  let url: string = `http://localhost:8080/sach/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const bookData = await response.json();
    const book: Book = {
      id: bookData.maSach,
      title: bookData.tenSach,
      description: bookData.moTa,
      listedPrice: bookData.giaNiemYet,
      discountPercent: bookData.phanTramGiamGia,
      price: bookData.giaBan,
      quantity: bookData.soLuong,
      soldQuantity: bookData.daBan,
      rating: bookData.trungBinhXepHang,
    };
    return book;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
}
