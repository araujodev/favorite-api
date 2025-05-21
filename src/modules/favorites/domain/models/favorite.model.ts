import { CustomerModel } from 'src/modules/customers/domain/models/customer.model';
import { ProductModel } from 'src/modules/products/domain/models/product.model';

export class FavoriteModel {
  id?: number;
  customerId: number;
  productId: number;

  customer: CustomerModel;
  product: ProductModel;

  constructor(obj?: object) {
    Object.assign(this, obj);
  }
}
