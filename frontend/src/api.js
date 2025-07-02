import axios from "axios";

const API_BASE = "http://localhost:3000"; 

export const getProblems = () => axios.get(`${API_BASE}/problems`);
export const addProblem = (data) => axios.post(`${API_BASE}/problems`, data);
export const getTopics = () => axios.get(`${API_BASE}/topics`);
export const updateNotes = (id, notes) => axios.put(`${API_BASE}/problems/${id}/notes`, { notes });
