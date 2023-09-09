import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import img from "../../assets/signinimg.jpg";
import { RoutesEnum } from "../../routes.enum";
import { Controller, useForm } from "react-hook-form";
import { signIn } from "./store/auth.actions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInValidationScheme } from "./utils/sign-in-validation.scheme";

const SignIn = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInValidationScheme()),
  });
  const body = {
    email: watch("email"),
    password: watch("password"),
  };
  const onSubmit = () => {
    try {
      dispatch<any>(signIn(body));
      navigate(RoutesEnum.ADMIN);
    } catch {
      throw new Error();
    }
  };

  return (
    <Stack component="main" height={"100vh"}>
      <Stack
        spacing={3}
        direction={"row"}
        overflow={"hidden"}
        justifyContent={"center"}
      >
        <Box component={"img"} src={img} />
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          alignSelf={"center"}
        >
          <Avatar />
          <Typography component="h1" variant="h5">
            {t("signin.signin")}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            marginTop={1}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  required
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                  fullWidth
                  id="email"
                  label={t("signin.email")}
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                  label={t("signin.password")}
                  type="password"
                  id="password"
                  {...field}
                />
              )}
            />
            <Box marginBottom={3} marginTop={3}>
              <Button type="submit" fullWidth variant="contained">
                {t("signin.signin")}
              </Button>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default SignIn;
