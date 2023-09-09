import React from "react";
import { Box, Paper, Stack } from "@mui/material";
import Logo from "../../assets/Logo.png";
import LanguageSelect from "../../components/language-select";

const LoginHeader = (): React.ReactElement => {
  return (
    <Box padding={1} component={Paper}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box component="img" alt="logo" src={Logo} width={90} height={45} />
        <LanguageSelect />
      </Stack>
    </Box>
  );
};

export default LoginHeader;
