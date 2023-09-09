import { refreshToken } from "./refreshApi";
import { Token } from "../types/token.type";

const isTokenValid = (decodedToken: Token) => {
  const { exp } = decodedToken;
  if (exp + 600 < Date.now() / 1000) {
    refreshToken();
  }
  return;
};

export default isTokenValid;
