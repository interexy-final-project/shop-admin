import {
  TableContainer,
  Box,
  Checkbox,
  Button,
  Table,
  TableHead,
  TableRow,
  TableSortLabel,
  TableCell,
  TableBody,
  Stack,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateOrders } from "./store/orders.actions";
import { ordersSelector } from "./store/orders.selectors";
import { OrderStatuses } from "./enums/order-statuses.enum";
import {
  setCount,
  setDirection,
  setPage,
  setSortBy,
} from "./store/orders.slice";
import { OrderSortQueries } from "./enums/order-sort-queries.enum";
import { SortDirections } from "../../enum/sort-direction.enum";
import { useTranslation } from "react-i18next";

const OrdersPage = () => {
  const { t } = useTranslation();
  const [checkedRows, setChecked] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { orders, amount, pagination } = useSelector(ordersSelector);

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
    dispatch<any>(updateOrders(checkedRows));
  };

  useEffect(() => {
    dispatch<any>(getOrders(pagination));
  }, [pagination]);

  const headCells = [
    { id: OrderSortQueries.USER, label: t("orderTable.userName") },
    { id: OrderSortQueries.TOTAL, label: t("orderTable.total") },
    { id: OrderSortQueries.STATUS, label: t("orderTable.status") },
    { id: OrderSortQueries.PM, label: t("orderTable.paymentMethod") },
  ];

  return (
    <Stack gap={2} alignItems={"flex-end"}>
      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="none">
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
              <TableCell key={"address"} align="left" padding="none">
                {t("orderTable.paymentMethod")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow key={row.id}>
                <TableCell padding={"none"}>
                  <Checkbox
                    checked={
                      checkedRows.includes(row.id) &&
                      row.status !== OrderStatuses.ARCHIVED
                    }
                    onChange={() => handleCheck(row.id)}
                    disabled={row.status === OrderStatuses.ARCHIVED}
                  />
                </TableCell>
                <TableCell padding="none">{row.userId}</TableCell>
                <TableCell padding="none">{row.total}</TableCell>
                <TableCell padding="none">{row.status}</TableCell>
                <TableCell padding="none">{row.paymentMethod}</TableCell>
                <TableCell padding="none">
                  {JSON.stringify(row.address)}
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
      <Box>
        <Button
          variant="contained"
          disabled={!checkedRows.length}
          onClick={handleArchive}
        >
          {t("orderTable.archive")}
        </Button>
      </Box>
    </Stack>
  );
};

export default OrdersPage;
