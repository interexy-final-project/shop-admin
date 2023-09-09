import * as Yup from "yup";
import { ProductTypes } from "../enums/product-types.enum";
import { ProductSizes } from "../enums/product-sizes.enum";
import { ProductColors } from "../enums/product-colors.enum";
import { ProductStatuses } from "../enums/product-statuses.enum";
import { ProductCategories } from "../enums/product-caterories.enum";

export const createValidation = Yup.object({
  name: Yup.string().required(),
  amount: Yup.number().required(),
  price: Yup.number().required(),
  category: Yup.string().oneOf(Object.values(ProductCategories)).required(),
  type: Yup.string().oneOf(Object.values(ProductTypes)).required(),
  sizes: Yup.array()
    .of(Yup.string().oneOf(Object.values(ProductSizes)))
    .required(),
  colors: Yup.array()
    .of(Yup.string().oneOf(Object.values(ProductColors)))
    .required(),
  hipGirth: Yup.string().when("type", {
    is: (type: ProductTypes) => type === ProductTypes.JEANS,
    then: (validation) => validation.required(),
    otherwise: (validation) => validation.notRequired(),
  }),
  sleeveLength: Yup.string().when("type", {
    is: (type: ProductTypes) => type === ProductTypes.SHIRT,
    then: (validation) => validation.required(),
    otherwise: (validation) => validation.notRequired(),
  }),
  waistGirth: Yup.string().when("type", {
    is: (type: ProductTypes) => type === ProductTypes.TSHIRT,
    then: (validation) => validation.required(),
    otherwise: (validation) => validation.notRequired(),
  }),
  status: Yup.string().oneOf(Object.values(ProductStatuses)).required(),
  description: Yup.string().required(),
  images: Yup.string().url().required(),
});
