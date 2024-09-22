import axios from "axios";
import { ToDoItem } from "../types/ToDoItem";
import { ToDoItemCreate } from "@/types/ToDoItemCreate";

//Define the base URL for your API
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TODOLIST_API_BASE_URL,
});

// Define a function to fetch all to-do items
export const fetchTodos = async (): Promise<ToDoItem[]> => {
  const response = await api.get<ToDoItem[]>("/todo");
  return response.data;
};

// Define a function to add a new to-do item
export const addTodo = async (todo: ToDoItemCreate): Promise<ToDoItem> => {
  const response = await api.post<ToDoItem>("/todo", todo);
  return response.data;
};

// Define a function to delete a to-do item by ID
export const deleteTodo = async (id: number) => {
  const response = await api.delete(`/todo/${id}`);
  return response.data;
};

export const toggleComplete = async (todo: ToDoItem): Promise<ToDoItem> => {
  const response = await api.put<ToDoItem>(`/todo/${todo.id}`, todo);
  return response.data;
};

// Define a function to search for to-do items using fuzzy search
export const searchTodos = async (searchTerm: string): Promise<ToDoItem[]> => {
  const response = await api.get<ToDoItem[]>(
    `/ToDo/fuzzysearch?searchTerm=${searchTerm}`
  );
  return response.data;
};
