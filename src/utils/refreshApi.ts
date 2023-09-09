import repository from "../repository";

export const refreshToken = async () => {
  try {
    const response = await repository.post("auth/refresh");
    localStorage.setItem("accessToken", response.data.access_token);
    localStorage.setItem("refreshToken", response.data.refresh_token);

    return response.data;
  } catch (error: any) {
    return error;
  }
};
