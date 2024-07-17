class Book {
  id: number;
  title: string;
  description: string;
  listedPrice: number;
  discountPercent: number;
  price: number;
  quantity: number;
  soldQuantity: number;
  rating: number;

  constructor(
    id: number,
    title: string,
    description: string,
    listedPrice: number,
    discountPercent: number,
    quantity: number,
    soldQuantity: number,
    rating: number,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.listedPrice = listedPrice;
    this.discountPercent = discountPercent;
    this.price = listedPrice * (1 - discountPercent / 100); // Calculating discounted price
    this.quantity = quantity;
    this.soldQuantity = soldQuantity;
    this.rating = rating;
  }
}
export default Book;
