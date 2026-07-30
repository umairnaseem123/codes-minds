import http from "./http";

export const getServices = () => http.get("/services");

export const getServiceBySlug = (slug) => http.get(`/services/${slug}`);

export const createService = (formData) =>
  http.post("/services", formData, { isForm: true, auth: true });

export const updateService = (id, formData) =>
  http.put(`/services/${id}`, formData, { isForm: true, auth: true });

export const deleteService = (id) => http.del(`/services/${id}`, { auth: true });
