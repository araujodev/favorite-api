export class ProductReviewModel {
  product_id: number;
  rate: number;
  count: number;

  constructor(obj?: object) {
    Object.assign(this, obj);
  }
}
