import { BaseState } from "../../../types/base-state.type";
import { SortPaginationParams } from "../../../types/sort-pagination-params.type";
import { ExtendedProductDto } from "./extended-product-dto.type";
import { ProductDto } from "./products-dto.type";

export interface ProductState extends BaseState {
  pagination: SortPaginationParams;
  products: ProductDto[];
  amount: number;
  product: ExtendedProductDto | null;
  pending: {
    products: boolean;
    product: boolean;
  };
  errors: {
    products: string | null;
    product: string | null;
  };
}
