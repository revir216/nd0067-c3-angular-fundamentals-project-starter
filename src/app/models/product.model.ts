export interface ProductModel {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public url: string,
    public description: string
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.url = url;
    this.description = description;
  }
}
