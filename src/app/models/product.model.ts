export interface ProductModel {
  id: number;
  name: string;
  price: number;
  url: string;
  description: string;
}

export class Product {
  id!: number;
  name!: string;
  price!: number;
  url!: string;
  description!: string;

}
