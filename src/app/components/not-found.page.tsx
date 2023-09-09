import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import NotFoundImage from "../../assets/not-found.png";
import { useTranslation } from "react-i18next";

export const NotFound: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box display="flex" justifyContent="center">
      <Stack alignItems="center">
        <img src={NotFoundImage} alt="not-found" />
        <Stack alignItems="center" p="2rem 0">
          <Typography variant="h1" p="0.5rem 0">
            {t("notFoundPage.oops")}
          </Typography>
          <Typography p="0.5rem 0">{t("notFoundPage.unavalible")}</Typography>
        </Stack>
        <Button sx={{ margin: "1rem 0" }}>{t("notFoundPage.back")}</Button>
      </Stack>
    </Box>
  );
};
