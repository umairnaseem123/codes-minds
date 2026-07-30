import http from "./http";

export const login = (email, password) => http.post("/auth/login", { email, password });

export const getMe = () => http.get("/auth/me", { auth: true });
