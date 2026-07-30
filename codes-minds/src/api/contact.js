import http from "./http";

export const submitContact = (payload) => http.post("/contact", payload);

export const getContacts = (status) =>
  http.get(status ? `/contact?status=${status}` : "/contact", { auth: true });

export const updateContact = (id, status) =>
  http.put(`/contact/${id}`, { status }, { auth: true });

export const deleteContact = (id) => http.del(`/contact/${id}`, { auth: true });
