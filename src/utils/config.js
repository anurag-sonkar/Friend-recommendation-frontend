export const getConfig = () => {
  const getTokenFromLocalStorage = localStorage.getItem("user-info")
    ? JSON.parse(localStorage.getItem("user-info"))
    : "";

  return {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage.token}`,
      Accept: "application/json",
    },
  };
};