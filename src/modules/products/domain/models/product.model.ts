import { ProductReviewModel } from './product-review.model';

export class ProductModel {
  id?: number;
  externalId: number;
  title: string;
  image: string;
  price: number;

  review?: ProductReviewModel;

  constructor(obj?: object) {
    Object.assign(this, obj);
  }
}
