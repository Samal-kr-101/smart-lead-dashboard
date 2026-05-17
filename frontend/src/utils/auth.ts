export const getRole = () => {
  return localStorage.getItem("role");
};

export const isAdmin = () => getRole() === "admin";
export const isSales = () => getRole() === "sales";