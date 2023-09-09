import { createAsyncThunk } from "@reduxjs/toolkit";
import repository from "../../../repository";
import { OrdersDto } from "../types/orders-dto.types";
import { SortPaginationParams } from "../../../types/sort-pagination-params.type";

export const getOrders = createAsyncThunk<OrdersDto[], SortPaginationParams>(
  `get/order`,
  async (SortPaginationParams, { rejectWithValue }) => {
    try {
      const response = await repository.get("/order", {
        params: SortPaginationParams,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const updateOrders = createAsyncThunk<OrdersDto[], string[]>(
  `put/order`,
  async (ids, { rejectWithValue }) => {
    try {
      const response = await repository.put("/order", ids);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);
