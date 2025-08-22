// src/services/api.ts
import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api"

export const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchFolders = () =>
  api.get("/folder/get_folders").then((res) => res.data); // [{ _id: 'Brochures', totalItems: 7 }, ...]