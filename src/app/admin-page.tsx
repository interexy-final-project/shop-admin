import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import ProductPage from "./product";
import OrdersPage from "./orders";
import LanguageSelect from "./components/language-select";
import { useTranslation } from "react-i18next";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AdminPage = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box component={Stack}>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignContent={"center"}
      >
        <Tabs
          variant="scrollable"
          value={value}
          onChange={handleTabChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label={t("admin.products")} />
          <Tab label={t("admin.orders")} />
        </Tabs>
        <LanguageSelect />
      </Stack>
      <TabPanel value={value} index={0}>
        <ProductPage />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OrdersPage />
      </TabPanel>
    </Box>
  );
};

export default AdminPage;
