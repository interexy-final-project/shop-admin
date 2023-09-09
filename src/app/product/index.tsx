import { Stack } from "@mui/material";
import ProductsTable from "./components/products-table";
import { useState } from "react";
import ProductViewUpdateForm from "./components/products-view-update-form";
import ProductCreateForm from "./components/products-create-form";

const ProductPage = () => {
  const [openView, setOpenView] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <Stack>
      <ProductsTable openView={setOpenView} openCreate={setOpenCreate} />
      <ProductViewUpdateForm open={openView} setOpen={setOpenView} />
      <ProductCreateForm open={openCreate} setOpen={setOpenCreate} />
    </Stack>
  );
};

export default ProductPage;
