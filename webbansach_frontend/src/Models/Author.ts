export class Author {
  authorID: number;
  authorName: string;
  authorCountry: string;
  authorMaxim: string;
  authorRating: number;
  urlAvt: string;
  // listBooks: book[],
  // listGenres: genre[]

  constructor(
    authorID: number,
    authorName: string,
    authorCountry: string,
    authorMaxim: string,
    authorRating: number,
    urlAvt: string,
    // listBooks: book[],
    // listGenres: genre[]
  ) {
    this.authorID = authorID;
    this.authorName = authorName;
    this.authorCountry = authorCountry;
    this.authorMaxim = authorMaxim;
    this.authorRating = authorRating;
    this.urlAvt = urlAvt;
  }
}
