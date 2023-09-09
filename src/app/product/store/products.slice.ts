import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../types/products-state.type";
import {
  createJeans,
  createShirt,
  createTShirt,
  getJeans,
  getProducts,
  getShirt,
  getTShirt,
  updateJeans,
  updateProducts,
  updateShirt,
  updateTShirt,
} from "./products.actions";
import { SortDirections } from "../../../enum/sort-direction.enum";

const initialState: ProductState = {
  pagination: {
    page: 0,
    count: 10,
    sortBy: null,
    direction: SortDirections.ASC,
  },
  amount: 0,
  products: [],
  product: null,
  pending: {
    products: false,
    product: false,
  },
  errors: {
    products: null,
    product: null,
  },
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<string>) => {
      state.pagination.sortBy = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.pagination.count = action.payload;
    },
    setDirection: (state, action: PayloadAction<SortDirections>) => {
      state.pagination.direction = action.payload;
    },
    clearProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.pending.products = true;
        state.errors.products = null;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.pending.products = false;
        state.products = payload;
        state.amount = payload.length;
      })
      .addCase(
        getProducts.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.products = false;
          state.errors.products = action.payload.message;
        },
      )
      .addCase(updateProducts.pending, (state) => {
        state.pending.products = true;
        state.errors.products = null;
      })
      .addCase(updateProducts.fulfilled, (state, { payload }) => {
        state.pending.products = false;
        state.products = payload;
        state.amount = payload.length;
      })
      .addCase(
        updateProducts.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.products = false;
          state.errors.products = action.payload.message;
        },
      )
      .addCase(getTShirt.pending, (state) => {
        state.pending.product = true;
        state.errors.product = null;
      })
      .addCase(getTShirt.fulfilled, (state, { payload }) => {
        state.pending.product = false;
        state.product = payload;
      })
      .addCase(getTShirt.rejected, (state, action: any & { payload: any }) => {
        state.pending.product = false;
        state.errors.product = action.payload.message;
      })
      .addCase(getShirt.pending, (state) => {
        state.pending.product = true;
        state.errors.product = null;
      })
      .addCase(getShirt.fulfilled, (state, { payload }) => {
        state.pending.product = false;
        state.product = payload;
      })
      .addCase(getShirt.rejected, (state, action: any & { payload: any }) => {
        state.pending.product = false;
        state.errors.product = action.payload.message;
      })
      .addCase(getJeans.pending, (state) => {
        state.pending.product = true;
        state.errors.product = null;
      })
      .addCase(getJeans.fulfilled, (state, { payload }) => {
        state.pending.product = false;
        state.product = payload;
      })
      .addCase(getJeans.rejected, (state, action: any & { payload: any }) => {
        state.pending.product = false;
        state.errors.product = action.payload.message;
      })
      .addCase(createTShirt.pending, (state) => {
        state.pending.product = true;
        state.errors.product = null;
      })
      .addCase(createTShirt.fulfilled, (state, { payload }) => {
        state.pending.product = false;
        state.product = payload;
      })
      .addCase(
        createTShirt.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.product = false;
          state.errors.product = action.payload.message;
        },
      )
      .addCase(createShirt.pending, (state) => {
        state.pending.product = true;
        state.errors.product = null;
      })
      .addCase(createShirt.fulfilled, (state, { payload }) => {
        state.pending.product = false;
        state.product = payload;
      })
      .addCase(
        createShirt.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.product = false;
          state.errors.product = action.payload.message;
        },
      )
      .addCase(createJeans.pending, (state) => {
        state.pending.product = true;
        state.errors.product = null;
      })
      .addCase(createJeans.fulfilled, (state, { payload }) => {
        state.pending.product = false;
        state.product = payload;
      })
      .addCase(
        createJeans.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.product = false;
          state.errors.product = action.payload.message;
        },
      )
      .addCase(updateTShirt.pending, (state) => {
        state.pending.product = true;
        state.errors.product = null;
      })
      .addCase(updateTShirt.fulfilled, (state, { payload }) => {
        state.pending.product = false;
        state.product = payload;
      })
      .addCase(
        updateTShirt.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.product = false;
          state.errors.product = action.payload.message;
        },
      )
      .addCase(updateShirt.pending, (state) => {
        state.pending.product = true;
        state.errors.product = null;
      })
      .addCase(updateShirt.fulfilled, (state, { payload }) => {
        state.pending.product = false;
        state.product = payload;
      })
      .addCase(
        updateShirt.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.product = false;
          state.errors.product = action.payload.message;
        },
      )
      .addCase(updateJeans.pending, (state) => {
        state.pending.product = true;
        state.errors.product = null;
      })
      .addCase(updateJeans.fulfilled, (state, { payload }) => {
        state.pending.product = false;
        state.product = payload;
      })
      .addCase(
        updateJeans.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.product = false;
          state.errors.product = action.payload.message;
        },
      );
  },
});

export const { setCount, setDirection, setPage, setSortBy, clearProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
