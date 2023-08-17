export const replacePath = (
  path: string,
  params: Record<string, any>
): string => {
  let replacedPath = path;
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const paramValue = params[key];
      replacedPath = replacedPath.replace(`:${key}`, paramValue);
    }
  }
  return replacedPath;
};
