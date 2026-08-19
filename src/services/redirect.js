export const redirect = (path, useRedirect = false, resetSearch = false) => {
  if (resetSearch) {
    path = path.split("?")[0];
  }

  const urlToRedirect = useRedirect
    ? `${path}?redirect=${encodeURIComponent(path)}`
    : path;

  window.history.pushState({}, "", urlToRedirect);
  window.dispatchEvent(new Event("popstate"));
};
