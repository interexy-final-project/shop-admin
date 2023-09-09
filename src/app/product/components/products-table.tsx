import {
  Box,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  Checkbox,
  TableFooter,
  TablePagination,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { productsSelector } from "../store/products.selectors";
import { useEffect, useState } from "react";
import {
  getJeans,
  getProducts,
  getShirt,
  getTShirt,
  updateProducts,
} from "../store/products.actions";
import { ProductsSortQueries } from "../enums/product-sort-queries.enum";
import {
  setCount,
  setDirection,
  setPage,
  setSortBy,
} from "../store/products.slice";
import { SortDirections } from "../../../enum/sort-direction.enum";
import { ProductStatuses } from "../enums/product-statuses.enum";
import AddIcon from "@mui/icons-material/Add";
import { ProductTypes } from "../enums/product-types.enum";
import { useTranslation } from "react-i18next";

type ProductsTableProps = {
  openView: (arg: boolean) => void;
  openCreate: (arg: boolean) => void;
};

const ProductsTable = (props: ProductsTableProps) => {
  const productsObjects = {
    [ProductTypes.JEANS]: {
      get: getJeans,
    },
    [ProductTypes.TSHIRT]: {
      get: getTShirt,
    },
    [ProductTypes.SHIRT]: {
      get: getShirt,
    },
  };
  const { t } = useTranslation();
  const { openView, openCreate } = props;
  const [checkedRows, setChecked] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { products, amount, pagination } = useSelector(productsSelector);

  const handleCheck = (id: string) => {
    if (checkedRows.includes(id)) {
      setChecked(checkedRows.filter((rowId) => rowId !== id));
    } else {
      setChecked([...checkedRows, id]);
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number,
  ) => {
    dispatch(setPage(page));
  };

  const handleChangelRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setCount(parseInt(event.target.value, 10)));
    dispatch(setPage(0));
  };

  const handleSortBy = (value: string) => {
    dispatch(setSortBy(value));
    dispatch(
      setDirection(
        pagination.direction === SortDirections.ASC
          ? SortDirections.DESC
          : SortDirections.ASC,
      ),
    );
  };

  const handleArchive = () => {
    dispatch<any>(updateProducts(checkedRows));
  };

  const handleAddProduct = () => {
    openCreate(true);
  };

  const handleViewClick = async (id: string, type: ProductTypes) => {
    await dispatch<any>(productsObjects[type].get(id));
    openView(true);
  };

  useEffect(() => {
    dispatch<any>(getProducts(pagination));
  }, [pagination]);

  useEffect(() => {
    dispatch<any>(getProducts(pagination));
  }, []);

  const headCells = [
    { id: ProductsSortQueries.NAME, label: t("productsTable.product") },
    { id: ProductsSortQueries.PRICE, label: t("productsTable.price") },
    { id: ProductsSortQueries.CATEGORY, label: t("productsTable.category") },
    { id: ProductsSortQueries.STATUS, label: t("productsTable.status") },
    { id: ProductsSortQueries.AMOUNT, label: t("productsTable.amount") },
  ];

  return (
    <Stack gap={2} alignItems={"flex-end"}>
      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              {headCells.map((headCell) => (
                <TableCell key={headCell.id} align={"left"} padding={"none"}>
                  <TableSortLabel
                    active={pagination.sortBy === headCell.id}
                    direction={
                      pagination.sortBy === headCell.id
                        ? pagination.direction
                        : "asc"
                    }
                    onClick={() => handleSortBy(headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>{t("productsTable.product")}</TableCell>
              <TableCell>{t("productsTable.view")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow key={row.id}>
                <TableCell padding={"none"}>
                  <Checkbox
                    checked={
                      checkedRows.includes(row.id) &&
                      row.status !== ProductStatuses.ARCHIVED
                    }
                    onChange={() => handleCheck(row.id)}
                    disabled={row.status === ProductStatuses.ARCHIVED}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleViewClick(row.id, row.type)}
                  >
                    {t("productsTable.view")}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                component={"td"}
                page={pagination.page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                rowsPerPageOptions={[5, 10, 25]}
                count={amount}
                rowsPerPage={pagination.count}
                onRowsPerPageChange={handleChangelRowsPerPage}
                onPageChange={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Stack direction={"row"} gap={3}>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleAddProduct}
        >
          {t("productsTable.addProduct")}
        </Button>
        <Button
          variant="contained"
          disabled={!checkedRows.length}
          onClick={handleArchive}
        >
          {t("productsTable.archive")}
        </Button>
      </Stack>
    </Stack>
  );
};

export default ProductsTable;
