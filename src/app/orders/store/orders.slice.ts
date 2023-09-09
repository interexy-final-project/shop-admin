import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { OrdersState } from "../types/orders-state.type";
import { getOrders, updateOrders } from "./orders.actions";
import { SortDirections } from "../../../enum/sort-direction.enum";

const initialState: OrdersState = {
  pagination: {
    page: 0,
    count: 10,
    sortBy: null,
    direction: SortDirections.ASC,
  },
  amount: 0,
  orders: [],
  pending: {
    orders: false,
  },
  errors: {
    orders: null,
  },
};

export const ordersSlice = createSlice({
  name: "orders",
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.pending.orders = true;
        state.errors.orders = null;
      })
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        state.pending.orders = false;
        state.orders = payload;
        state.amount = payload.length;
      })
      .addCase(getOrders.rejected, (state, action: any & { payload: any }) => {
        state.pending.orders = false;
        state.errors.orders = action.payload.message;
      })
      .addCase(updateOrders.pending, (state) => {
        state.pending.orders = true;
        state.errors.orders = null;
      })
      .addCase(updateOrders.fulfilled, (state, { payload }) => {
        state.pending.orders = false;
        state.orders = payload;
        state.amount = payload.length;
      })
      .addCase(
        updateOrders.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.orders = false;
          state.errors.orders = action.payload.message;
        },
      );
  },
});

export const { setCount, setDirection, setPage, setSortBy } =
  ordersSlice.actions;

export default ordersSlice.reducer;
