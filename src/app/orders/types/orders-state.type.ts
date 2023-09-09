import { BaseState } from "../../../types/base-state.type";
import { SortPaginationParams } from "../../../types/sort-pagination-params.type";
import { OrdersDto } from "./orders-dto.types";

export interface OrdersState extends BaseState {
  pagination: SortPaginationParams;
  orders: OrdersDto[];
  amount: number;
  pending: {
    orders: boolean;
  };
  errors: {
    orders: string | null;
  };
}
