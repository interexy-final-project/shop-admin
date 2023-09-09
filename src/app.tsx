import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import AppRoutes from "./app.routes";
import decodeToken from "./utils/jwtDecode";
import isTokenValid from "./utils/isTokenValid";

function App(): JSX.Element {
  const token = decodeToken();
  if (token) {
    isTokenValid(token);
  }

  return (
    <BrowserRouter>
      <CssBaseline />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
