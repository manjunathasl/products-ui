import HttpService from "./base-http.service";

export default class ProductsService extends HttpService {
  getProducts(page = 1) {
    return this.get(`products?page=${page}`);
  }
}
