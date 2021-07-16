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
      const product = productData.name;
      const price = +productData.price;
      const number = +productData.number;
      const id = productData.id;
      if (state.cartProductsArray.find((product) => product.id === id)) {
        const indexOfProduct = state.cartProductsArray.findIndex(
          (product) => product.id === id
        );
        state.cartProductsArray[indexOfProduct].number += number;
      } else {
        state.cartProductsArray = [
          ...state.cartProductsArray,
          {
            product: product,
            price: price,
            number: number,
            id: id,
          },
        ];
      }

      state.total += number * price;
    },
    deleteFromCart(state, action) {
      const idOfProduct = action.payload.id;
      const number = +action.payload.number;
      const price = +action.payload.price;
      state.cartProductsArray = state.cartProductsArray.filter(
        (product) => product.id !== idOfProduct
      );
      state.total -= number * price;
    },
    clearCart(state) {
      state.total = 0;
      state.cartProductsArray = [];
    },
  },
});
export const cartAction = CartReducer.actions;
