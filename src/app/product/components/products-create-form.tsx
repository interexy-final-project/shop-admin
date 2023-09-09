import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { ProductTypes } from "../enums/product-types.enum";
import {
  createJeans,
  createShirt,
  createTShirt,
} from "../store/products.actions";
import { useDispatch } from "react-redux";
import { ProductStatuses } from "../enums/product-statuses.enum";
import { Controller, useForm } from "react-hook-form";
import { ProductCategories } from "../enums/product-caterories.enum";
import { clearProduct } from "../store/products.slice";
import { IntendedProductDto } from "../types/extended-product-dto.type";
import { ProductColors } from "../enums/product-colors.enum";
import { ProductSizes } from "../enums/product-sizes.enum";
import { useTranslation } from "react-i18next";

export interface SimpleDialogProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
}

const ProductCreateForm = (props: SimpleDialogProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { open, setOpen } = props;
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      images: [],
      price: 0,
      sizes: [],
      type: ProductTypes.JEANS,
      colors: [],
      status: ProductStatuses.ACTIVE,
      description: "",
      amount: 0,
      category: ProductCategories.MAN,
      sleeveLength: 0,
      hipGirth: 0,
      waistGirth: 0,
    },
  });

  const handleClose = () => {
    dispatch(clearProduct());
    reset({});
    setOpen(false);
  };

  const onSubmit = (data: IntendedProductDto) => {
    data.amount = parseFloat(String(data.amount));
    data.price = parseFloat(String(data.price));
    if (watch("type") === ProductTypes.JEANS) {
      dispatch<any>(createJeans(data));
    }
    if (watch("type") === ProductTypes.SHIRT) {
      dispatch<any>(createShirt(data));
    }
    if (watch("type") === ProductTypes.TSHIRT) {
      dispatch<any>(createTShirt(data));
    }
    dispatch(clearProduct());
    reset({});
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} component={Stack} fullWidth>
      <Box>
        <Stack flexDirection={"row"} width={"100%"}>
          <DialogTitle>{t("createForm.title")}</DialogTitle>
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
                    label={t("createForm.price")}
                    variant="standard"
                  />
                )}
              />
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="category"
                    required
                    label={t("createForm.category")}
                    select
                  >
                    <MenuItem value={ProductCategories.MAN}>
                      {t("createForm.man")}
                    </MenuItem>
                    <MenuItem value={ProductCategories.WOMAN}>
                      {t("createForm.woman")}
                    </MenuItem>
                    <MenuItem value={ProductCategories.CHILDREN}>
                      {t("createForm.children")}
                    </MenuItem>
                  </TextField>
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
              {watch("type") === ProductTypes.JEANS && (
                <Controller
                  name="hipGirth"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      id="hipGirth"
                      label={t("createForm.hipGirth")}
                      variant="standard"
                    />
                  )}
                />
              )}
              {watch("type") === ProductTypes.SHIRT && (
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
                    />
                  )}
                />
              )}
              {watch("type") === ProductTypes.TSHIRT && (
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
                  />
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button type="submit">{t("createForm.submit")}</Button>
            <Button onClick={handleClose}>{t("createForm.cancel")}</Button>
          </DialogActions>
        </FormControl>
      </Box>
    </Dialog>
  );
};

export default ProductCreateForm;
