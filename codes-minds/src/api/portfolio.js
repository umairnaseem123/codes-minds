import http from "./http";

export const getPortfolio = (serviceId) =>
  http.get(serviceId ? `/portfolio?service=${serviceId}` : "/portfolio");

export const getPortfolioById = (id) => http.get(`/portfolio/${id}`);

export const createPortfolio = (formData) =>
  http.post("/portfolio", formData, { isForm: true, auth: true });

export const updatePortfolio = (id, formData) =>
  http.put(`/portfolio/${id}`, formData, { isForm: true, auth: true });

export const deletePortfolio = (id) => http.del(`/portfolio/${id}`, { auth: true });
