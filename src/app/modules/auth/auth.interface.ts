export type LoginUserType = {
  id: string;
  password: string;
};

export type LoginUserResponseType = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean;
};

export type ChangePasswordType = {
  oldPassword: string;
  newPassword: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
};
