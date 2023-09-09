import { createAsyncThunk } from "@reduxjs/toolkit";
import repository from "../../../repository";
import { ProductDto } from "../types/products-dto.type";
import { SortPaginationParams } from "../../../types/sort-pagination-params.type";
import { ShirtTypeDto } from "../types/shirt-dto.type";
import { TShirtTypeDto } from "../types/t-shirt-dto.type";
import { JeansTypeDto } from "../types/jeans-dto.type";
import { JeansForm } from "../types/jeans-form.type";
import { TShirtForm } from "../types/t-shirt-form.type";
import { ShirtForm } from "../types/shirt-form.type";

export const getProducts = createAsyncThunk<ProductDto[], SortPaginationParams>(
  `get/products`,
  async (SortPaginationParams, { rejectWithValue }) => {
    try {
      const response = await repository.get("/products", {
        params: SortPaginationParams,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const updateProducts = createAsyncThunk<ProductDto[], string[]>(
  `put/products`,
  async (ids, { rejectWithValue }) => {
    try {
      const response = await repository.put("/products", ids);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const getShirt = createAsyncThunk<ShirtTypeDto, string>(
  `get/shirt`,
  async (id, { rejectWithValue }) => {
    try {
      const response = await repository.get(`/shirts/${id}`);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const getTShirt = createAsyncThunk<TShirtTypeDto, string>(
  `get/tshirt`,
  async (id, { rejectWithValue }) => {
    try {
      const response = await repository.get(`/t-shirt-type/${id}`);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const getJeans = createAsyncThunk<JeansTypeDto, string>(
  `get/jeans`,
  async (id, { rejectWithValue }) => {
    try {
      const response = await repository.get(`/jeans-type/${id}`);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const createShirt = createAsyncThunk<ShirtTypeDto, ShirtForm>(
  `post/shirt`,
  async (body, { rejectWithValue }) => {
    try {
      const response = await repository.post("/shirts", body);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const createTShirt = createAsyncThunk<TShirtTypeDto, TShirtForm>(
  `post/tshirt`,
  async (body, { rejectWithValue }) => {
    try {
      const response = await repository.post("/t-shirt-type", body);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const createJeans = createAsyncThunk<JeansTypeDto, JeansForm>(
  `post/jeans`,
  async (body, { rejectWithValue }) => {
    try {
      const response = await repository.post("jeans-type", body);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const updateShirt = createAsyncThunk<
  ShirtTypeDto,
  { body: ShirtTypeDto; id: string }
>(`put/shirt`, async ({ body, id }, { rejectWithValue }) => {
  try {
    const response = await repository.put(`/shirts/${id}`, body);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const updateTShirt = createAsyncThunk<
  TShirtTypeDto,
  { body: TShirtTypeDto; id: string }
>(`put/tshirt`, async ({ body, id }, { rejectWithValue }) => {
  try {
    const response = await repository.put(`/t-shirt-type/${id}`, body);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const updateJeans = createAsyncThunk<
  JeansTypeDto,
  { body: JeansTypeDto; id: string }
>(`put/jeans`, async ({ body, id }, { rejectWithValue }) => {
  try {
    const response = await repository.put(`/jeans-type/${id}`, body);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});
