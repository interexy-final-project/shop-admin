export interface Token {
  id: string;
  email: string;
  permissions: string[];
  iat: number;
  exp: number;
}
