import jwtDecode from "jwt-decode";
import { Token } from "../types/token.type";

const decodeToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const decodedToken: Token = jwtDecode(accessToken);

    return decodedToken;
  } else {
    return null;
  }
};

export default decodeToken;
