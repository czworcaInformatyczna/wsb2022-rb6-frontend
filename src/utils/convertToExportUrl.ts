export const convertToExportUrl = (url: string, params: {}) => {
  let path = url + '?';
  Object.keys(params).map(
    (param) => (path += param + '=' + params[param as keyof typeof params] + '&'),
  );
  return path;
};
