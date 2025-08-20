// src/services/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const fetchFolders = () =>
  api.get("/folder/get_folders").then((res) => res.data); // [{ _id: 'Brochures', totalItems: 7 }, ...]