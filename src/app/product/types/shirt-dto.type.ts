import { ProductDto } from "./products-dto.type";

export interface ShirtTypeDto extends ProductDto {
  sleeveLength: number;
}
