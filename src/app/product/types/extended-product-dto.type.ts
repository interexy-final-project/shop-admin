import { UUIDDto } from "../../../types/uuid-dto.type";
import { ProductBaseDto } from "./product-base-dto-type";
import { ProductDto } from "./products-dto.type";

export interface ExtendedProductDto extends ProductDto {
  sleeveLength?: number;
  hipGirth?: number;
  waistGirth?: number;
}

export interface IntendedProductDto extends ProductBaseDto {
  sleeveLength: number;
  hipGirth: number;
  waistGirth: number;
}

export interface IntendedProductDtoUUID extends IntendedProductDto, UUIDDto {}
