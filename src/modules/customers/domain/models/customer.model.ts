export class CustomerModel {
  id?: number;
  name: string;
  email: string;
  document?: string;

  constructor(obj?: object) {
    Object.assign(this, obj);
  }
}
