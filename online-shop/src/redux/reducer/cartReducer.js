import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartProductsArray: [],
  total: 0,
};
export const CartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const productData = action.payload;
      const name = productData.name;
      const price = +productData.price;
      const stock = +productData.stock;
      const id = productData.id;
      if (state.cartProductsArray.find((product) => product.id === id)) {
        const indexOfProduct = state.cartProductsArray.findIndex(
          (product) => product.id === id
        );
        state.cartProductsArray[indexOfProduct].stock += stock;
      } else {
        state.cartProductsArray = [
          ...state.cartProductsArray,
          {
            name: name,
            price: price,
            stock: stock,
            id: id,
          },
        ];
      }

      state.total += stock * price;
    },
    deleteFromCart(state, action) {
      const idOfProduct = action.payload.id;
      const stock = +action.payload.stock;
      const price = +action.payload.price;
      state.cartProductsArray = state.cartProductsArray.filter(
        (product) => product.id !== idOfProduct
      );
      state.total -= stock * price;
    },
  },
});
export const cartAction = CartReducer.actions;
