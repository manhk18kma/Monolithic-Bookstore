import { Author } from "./../Models/Author";

export function fetchApi(url: string): Promise<Author[]> {
  return new Promise<Author[]>((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const authorList: Author[] = [];
        const authorListResponse = data._embedded.tacGias;
        for (const key in authorListResponse) {
          authorList.push({
            authorID: authorListResponse[key].maTacGia,
            authorName: authorListResponse[key].tenTacGia,
            authorCountry: authorListResponse[key].urlQuocTich,
            authorMaxim: authorListResponse[key].tramNgon,
            authorRating: authorListResponse[key].rating,
            urlAvt: authorListResponse[key].urlAvt,
          });
        }
        resolve(authorList);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getAllAuthors(): Promise<Author[]> {
  let url: string = "http://localhost:8080/tac-gia";
  return fetchApi(url);
}

export function getAllAuthorOfBook(id: number): Promise<Author[]> {
  let url: string = `http://localhost:8080/sach/${id}/danhSachTacGia`;
  return fetchApi(url);
}

export function getAuthorById(id: number): Promise<Author> {
  const url: string = `http://localhost:8080/tac-gia/${id}`;

  return new Promise<Author>((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Assuming data is an object containing author details
        const author: Author = {
          authorID: data.maTacGia,
          authorName: data.tenTacGia,
          authorCountry: data.urlQuocTich,
          authorMaxim: data.tramNgon,
          authorRating: data.rating,
          urlAvt: data.urlAvt,
        };
        resolve(author);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
