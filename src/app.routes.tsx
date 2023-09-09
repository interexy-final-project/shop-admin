import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./app/auth/sign-in-page";
import { RoutesEnum } from "./routes.enum";
import jwtDecode from "jwt-decode";
import { Token } from "./types/token.type";
import { Suspense } from "react";
import AdminPage from "../src/app/admin-page";
import { NotFound } from "./app/components/not-found.page";

// ======= private route ======= //
const PrivateRoute = (element: JSX.Element) => {
  const accessToken = localStorage.getItem("accessToken");
  const permissions: string[] = [];

  if (accessToken) {
    const decodedToken: Token = jwtDecode(accessToken);
    decodedToken.permissions.forEach((item) => permissions.push(item));
  }
  return permissions.includes("client") ? (
    <Suspense fallback={<div />}>{element}</Suspense>
  ) : (
    <Navigate to={RoutesEnum.SIGNIN} />
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={RoutesEnum.SIGNIN} element={<SignIn />} />
      <Route path={RoutesEnum.ADMIN} element={PrivateRoute(<AdminPage />)} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
