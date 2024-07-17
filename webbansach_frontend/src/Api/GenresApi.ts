import Genres from "../Models/Genres";

function fetchApi(url: string): Promise<Genres[]> {
  return new Promise<Genres[]>((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const genresList: Genres[] = [];
        const genresListResponse = data._embedded.theLoais;

        for (const key in genresListResponse) {
          genresList.push({
            id: genresListResponse[key].maTheLoai,
            name: genresListResponse[key].tenTheLoai,
          });
        }

        resolve(genresList);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getAllGenres(): Promise<Genres[]> {
  let url: string = "http://localhost:8080/the-loai";
  return fetchApi(url);
}

export function getAllGenresOfBook(id: number): Promise<Genres[]> {
  let url: string = `http://localhost:8080/sach/${id}/danhSachTheLoai`;
  return fetchApi(url);
}
