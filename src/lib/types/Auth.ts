export type LoginFormDataType = {
  email: string;
  password: string;
};

export type SignUpFormDataType = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type ChangePasswordFormDataType = {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
};

export type ErrorsType =
  | LoginFormDataType
  | SignUpFormDataType
  | ChangePasswordFormDataType;
