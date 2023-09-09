import { UUIDDto } from "../../../types/uuid-dto.type";
import { ProductBaseDto } from "./product-base-dto-type";

export interface ProductDto extends UUIDDto, ProductBaseDto {}
