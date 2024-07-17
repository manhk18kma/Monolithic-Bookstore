class Image {
  id: number;
  title: string;
  urlImg: string;
  isAvt: boolean;

  constructor(id: number, title: string, urlImg: string, isAvt: boolean) {
    this.id = id;
    this.title = title;
    this.urlImg = urlImg;
    this.isAvt = isAvt;
  }
}
export default Image;
