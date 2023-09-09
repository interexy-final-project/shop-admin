import { ProductDto } from "./products-dto.type";

export interface TShirtTypeDto extends ProductDto {
  waistGirth: number;
}
