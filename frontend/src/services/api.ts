import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with your backend server if deployed

export const fetchTasks = () => axios.get(`${API_URL}/tasks`);
export const addTask = (task: { title: string; description: string }) => axios.post(`${API_URL}/tasks`, task);
export const toggleTask = (id: number) => axios.put(`${API_URL}/tasks/${id}/toggle`);
export const deleteTask = (id: number) => axios.delete(`${API_URL}/tasks/${id}`);
