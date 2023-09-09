import { UUIDDto } from "../../../types/uuid-dto.type";
import { OrderPaymentMethods } from "../enums/order-payment-methods.enum";
import { OrderStatuses } from "../enums/order-statuses.enum";

export interface OrdersDto extends UUIDDto {
  userId: string;
  total: number;
  status: OrderStatuses;
  address: any;
  paymentMethod: OrderPaymentMethods;
}
