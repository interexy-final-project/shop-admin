import { useTranslation } from "react-i18next";
import * as yup from "yup";

export const SignInValidationScheme = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    email: yup.string().email(t("errors.email")).required(t("errors.required")),
    password: yup.string().required(t("errors.required")),
  });
};
