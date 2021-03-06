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
function getGroups() {
  return http
    .get("/groups")
    .then((response) => response.data)
    .catch((error) => error);
}
function deleteProduct(id) {
  return http
    .delete(`/products/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
}
function patchProduct(data, id) {
  return http
    .patch(`/products/${id}`, data)
    .then((response) => response.data)
    .catch((error) => error);
}
function patchOrder(data, id) {
  return http
    .patch(`/orders/${id}`, data)
    .then((response) => response.data)
    .catch((error) => error);
}
function postProduct(data) {
  return http
    .post(`/products`, data)
    .then((response) => response.data)
    .catch((error) => error);
}
function getProductsofGroup(group) {
  return http
    .get(`/products?group=${group}`)
    .then((response) => response.data)
    .catch((error) => error);
}
function getProductWithId(id) {
  return http
    .get(`/products/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
}
function postOrder(data) {
  return http
    .post(`/orders`, data)
    .then((response) => response.data)
    .catch((error) => error);
}
export {
  getProducts,
  getOrders,
  getGroups,
  deleteProduct,
  patchProduct,
  postProduct,
  getProductsofGroup,
  getProductWithId,
  postOrder,
  patchOrder,
};
