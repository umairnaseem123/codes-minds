import http from "./http";

export const getTeam = () => http.get("/team");

export const createTeam = (formData) =>
  http.post("/team", formData, { isForm: true, auth: true });

export const updateTeam = (id, formData) =>
  http.put(`/team/${id}`, formData, { isForm: true, auth: true });

export const deleteTeam = (id) => http.del(`/team/${id}`, { auth: true });
