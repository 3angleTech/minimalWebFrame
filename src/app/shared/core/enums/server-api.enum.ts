
export enum ServerApi {
  AuthToken = '/auth/token',
  Logout = '/auth/logout',
  AccountMe = '/account/me',
  AccountCreate = '/account/create',
  AccountActivate = '/account/activate',
  AccountChangePassword = '/account/change-password',
  AccountForgotPassword = '/account/forgot-password',
  AccountResetPassword = '/account/reset-password',
  UserById = '/users/{{userId}}',
}
