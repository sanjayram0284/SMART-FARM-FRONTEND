import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" }
});

// USER
const getUserEmail = () =>
  JSON.parse(localStorage.getItem("user"))?.email;

/* ===== CROPS ===== */

export const addNewCrop = (data) =>
  API.post("/crops", data, {
    params: { userEmail: getUserEmail() }
  });

export const getCrops = () =>
  API.get("/crops", {
    params: { userEmail: getUserEmail() }
  });

export const getRecommendations = (soil, season) =>
  API.get("/crops/recommend", {
    params: {
      soil,
      season,
      userEmail: getUserEmail()
    }
  });

/* ===== SOIL ===== */

export const getSoils = () =>
  API.get("/soil", {
    params: { userEmail: getUserEmail() }
  });

export const getCropsBySoil = (soilType) =>
  API.get(`/soil/${soilType}`, {
    params: { userEmail: getUserEmail() }
  });

/* ===== EXPENSE ===== ✅ ADD THIS */

export const updateExpense = (data) =>
  API.put("/expenses/update", data, {
    params: { userEmail: getUserEmail() }
  });

export const getExpenseHistory = (cropName) =>
  API.get(`/expenses/history/${cropName}`, {
    params: { userEmail: getUserEmail() }
  });


/* ===== AUTH ===== */

export const login = (data) => API.post("/auth/login", data);
export const signup = (data) => API.post("/auth/signup", data);
