export const getBackgroundCssWithFallback = (paths: string[]) =>
  paths.reduce((acc, path) => {
    if (acc === '') {
      return `background: url(${path});`;
    }
    return `${acc}\nbackground: url(${path});`;
  }, '');
