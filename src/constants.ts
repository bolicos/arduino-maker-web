export const ROUTES = {
  HOME: () => '/',
  CREATE: () => '/create',
  MAKER: () => '/maker',
  CODE: () => '/code',
  NOT_FOUND: () => '*',
};

export const LINKS = {
  GITHUB: () => 'https://github.com/analuciabolico/arduino-maker-web',
  NOTION: () => 'https://alma-smart-motors-ifrs.notion.site/Github-981509f3960846db98a6942e6e84072c',
  DOCS: () => 'https://github.com/analuciabolico/arduino-maker-web/wiki',
};

export const APP = {
  get ENV() {
    const env = process.env.NODE_ENV;
    return env !== null ? env : 'development';
  },
  BFF_URL: process.env.REACT_APP_BFF_URL || 'http://localhost:8080',
};
