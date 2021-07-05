import { http } from "../utils/Http.util";
function getProducts() {
  return http
    .get("/products")
    .then((response) => response.data)
    .catch((error) => error);
}
function getOrders() {
  return http
    .get("/orders")
    .then((response) => response.data)
    .catch((error) => error);
}
export { getProducts, getOrders };
