import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  Box,
  Button,
  Skeleton,
  DialogActions,
  DialogContent,
  FormControl,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Select,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ProductTypes } from "../enums/product-types.enum";
import { useDispatch, useSelector } from "react-redux";
import { productsSelector } from "../store/products.selectors";
import { ProductStatuses } from "../enums/product-statuses.enum";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { clearProduct } from "../store/products.slice";
import { IntendedProductDtoUUID } from "../types/extended-product-dto.type";
import { ProductSizes } from "../enums/product-sizes.enum";
import { ProductColors } from "../enums/product-colors.enum";
import {
  updateJeans,
  updateShirt,
  updateTShirt,
} from "../store/products.actions";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { viewValidation } from "../utils/product-form-validation-view";

export interface SimpleDialogProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
}

const ProductViewUpdateForm = (props: SimpleDialogProps) => {
  const { t } = useTranslation();
  const [isView, setView] = useState(true);
  const {
    product,
    pending: { product: isPending },
  } = useSelector(productsSelector);
  const dispatch = useDispatch();
  const { open, setOpen } = props;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IntendedProductDtoUUID>({
    defaultValues: {
      name: product?.name,
      images: product?.images,
      price: product?.price,
      sizes: product?.sizes,
      type: product?.type,
      colors: product?.colors,
      status: product?.status,
      description: product?.description,
      amount: product?.amount,
      category: product?.category,
      sleeveLength: product?.sleeveLength,
      hipGirth: product?.hipGirth,
      waistGirth: product?.waistGirth,
    },
  });

  useEffect(() => {
    product && reset(product);
  }, [product]);

  const handleClose = () => {
    setView(true);
    dispatch(clearProduct());
    reset({});
    setOpen(false);
  };

  const onSubmit = (data: IntendedProductDtoUUID) => {
    data.amount = parseFloat(String(data.amount));
    data.price = parseFloat(String(data.price));
    if (product?.type === ProductTypes.JEANS) {
      dispatch<any>(updateJeans({ body: data, id: product.id }));
    }
    if (product?.type === ProductTypes.SHIRT) {
      dispatch<any>(updateShirt({ body: data, id: product.id }));
    }
    if (product?.type === ProductTypes.TSHIRT) {
      dispatch<any>(updateTShirt({ body: data, id: product.id }));
    }
    dispatch(clearProduct());
    // reset(productInitialState);
    handleClose();
  };
  const handleEditClick = () => {
    setView(!isView);
  };

  return (
    <Dialog open={open} onClose={handleClose} component={Stack} fullWidth>
      {isPending ? (
        <Skeleton variant="rectangular" width={600} height={600} />
      ) : (
        <Box>
          <Stack flexDirection={"row"} width={"100%"}>
            <DialogTitle>{t("createForm.title")}</DialogTitle>
            <IconButton onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
          </Stack>
          <FormControl onSubmit={handleSubmit(onSubmit)} component={"form"}>
            <DialogContent>
              <Stack gap={2}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      id="name"
                      label={t("createForm.name")}
                      disabled={isView}
                      variant="standard"
                    />
                  )}
                />
                <Controller
                  name="amount"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      id="amount"
                      label={t("createForm.amount")}
                      disabled={isView}
                      variant="standard"
                    />
                  )}
                />
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      id="price"
                      label={t("createForm.prive")}
                      variant="standard"
                      disabled={isView}
                    />
                  )}
                />
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="type"
                      required
                      label={t("createForm.type")}
                      select
                      disabled={isView}
                    >
                      <MenuItem value={ProductTypes.JEANS}>
                        {t("createForm.jeans")}
                      </MenuItem>
                      <MenuItem value={ProductTypes.TSHIRT}>
                        {t("createForm.tshirt")}
                      </MenuItem>
                      <MenuItem value={ProductTypes.SHIRT}>
                        {t("createForm.shirt")}
                      </MenuItem>
                    </TextField>
                  )}
                />
                <Controller
                  name="sizes"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      id="sizes"
                      required
                      label={t("createForm.sizes")}
                      multiple
                      disabled={isView}
                    >
                      <MenuItem value={ProductSizes.XS}>
                        {t("createForm.xs")}
                      </MenuItem>
                      <MenuItem value={ProductSizes.S}>
                        {t("createForm.s")}
                      </MenuItem>
                      <MenuItem value={ProductSizes.M}>
                        {t("createForm.m")}
                      </MenuItem>
                    </Select>
                  )}
                />
                <Controller
                  name="colors"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      id="colors"
                      required
                      label={t("createForm.colors")}
                      multiple
                      disabled={isView}
                    >
                      <MenuItem value={ProductColors.BLACK}>
                        {t("createForm.black")}
                      </MenuItem>
                      <MenuItem value={ProductColors.WHITE}>
                        {t("createForm.white")}
                      </MenuItem>
                      <MenuItem value={ProductColors.BLUE}>
                        {t("createForm.blue")}
                      </MenuItem>
                      <MenuItem value={ProductColors.RED}>
                        {t("createForm.red")}
                      </MenuItem>
                    </Select>
                  )}
                />
                {product?.type === ProductTypes.JEANS && (
                  <Controller
                    name="hipGirth"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        id="hipGirth"
                        label={t("createForm.hipGirth")}
                        disabled={isView}
                        variant="standard"
                      />
                    )}
                  />
                )}
                {product?.type === ProductTypes.SHIRT && (
                  <Controller
                    name="sleeveLength"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        id="sleeveLength"
                        label={t("createForm.sleeveLength")}
                        variant="standard"
                        disabled={isView}
                      />
                    )}
                  />
                )}
                {product?.type === ProductTypes.TSHIRT && (
                  <Controller
                    name="waistGirth"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        id="waistGirth"
                        label={t("createForm.waistGirth")}
                        variant="standard"
                        disabled={isView}
                      />
                    )}
                  />
                )}
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      required
                      id="status"
                      label={t("createForm.status")}
                      disabled={isView}
                    >
                      <MenuItem value={ProductStatuses.ACTIVE}>
                        {t("createForm.active")}
                      </MenuItem>
                      <MenuItem value={ProductStatuses.ARCHIVED}>
                        {t("createForm.archived")}
                      </MenuItem>
                    </TextField>
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="description"
                      label={t("createForm.description")}
                      required
                      variant="standard"
                      disabled={isView}
                      multiline
                    />
                  )}
                />
                <Controller
                  name="images"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="image"
                      label={t("createForm.images")}
                      required
                      variant="standard"
                      disabled={isView}
                    />
                  )}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              {!isView && (
                <Button type="submit">{t("createForm.submit")}</Button>
              )}
              <Button onClick={handleClose}>{t("createForm.cancel")}</Button>
            </DialogActions>
          </FormControl>
        </Box>
      )}
    </Dialog>
  );
};

export default ProductViewUpdateForm;
