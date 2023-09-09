import { ProductCategories } from "../enums/product-caterories.enum";
import { ProductColors } from "../enums/product-colors.enum";
import { ProductSizes } from "../enums/product-sizes.enum";
import { ProductStatuses } from "../enums/product-statuses.enum";
import { ProductTypes } from "../enums/product-types.enum";

export interface ProductBaseDto {
  name: string;
  images: string[];
  price: number;
  sizes: ProductSizes[];
  type: ProductTypes;
  colors: ProductColors[];
  status: ProductStatuses;
  description: string;
  amount: number;
  category: ProductCategories;
}
