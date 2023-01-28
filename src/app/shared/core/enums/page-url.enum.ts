/**
 * Enum providing a list of well known page URLs.
 */
export const enum PageUrl {
  HOME_PAGE = '/',

  // Generic system pages:
  NOT_FOUND = '/system/page-not-found',

  // Account feature pages:
  FORGOT_PASSWORD_PAGE = '/account/forgot-password',
  LOGIN_PAGE = '/account/login',
  LOGOUT_PAGE = '/account/logout',
  SIGNUP_PAGE = '/account/signup',

  // Profile feature pages:
  PROFILE_PAGE = '/profile',
  PROFILE_SETTINGS_PAGE = '/profile/settings',
}
