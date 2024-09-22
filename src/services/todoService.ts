import axios from 'axios';
import { ToDoItem } from '../types/ToDoItem';
import { ToDoItemCreate } from '@/types/ToDoItemCreate';

//Define the base URL for the API
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TODOLIST_API_BASE_URL,
});

/**
 * Fetches all to-do items.
 * @returns {Promise<ToDoItem[]>} A promise that resolves to an array of to-do items.
 */
export const fetchTodos = async (): Promise<ToDoItem[]> => {
  const response = await api.get<ToDoItem[]>('/todo');
  return response.data;
};

/**
 * Adds a new to-do item.
 * @param {ToDoItemCreate} todo - The to-do item to add.
 * @returns {Promise<ToDoItem>} A promise that resolves to the added to-do item.
 */
export const addTodo = async (todo: ToDoItemCreate): Promise<ToDoItem> => {
  const response = await api.post<ToDoItem>('/todo', todo);
  return response.data;
};

/**
 * Deletes a to-do item by ID.
 * @param {number} id - The ID of the to-do item to delete.
 * @returns {Promise<any>} A promise that resolves to the response data.
 */
export const deleteTodo = async (id: number) => {
  const response = await api.delete(`/todo/${id}`);
  return response.data;
};

/**
 * Toggles the completion status of a to-do item.
 * @param {ToDoItem} todo - The to-do item to update.
 * @returns {Promise<ToDoItem>} A promise that resolves to the updated to-do item.
 */
export const toggleComplete = async (todo: ToDoItem): Promise<ToDoItem> => {
  const response = await api.put<ToDoItem>(`/todo/${todo.id}`, todo);
  return response.data;
};

/**
 * Searches for to-do items using fuzzy search.
 * @param {string} searchTerm - The search term to use.
 * @returns {Promise<ToDoItem[]>} A promise that resolves to an array of matching to-do items.
 */
export const searchTodos = async (searchTerm: string): Promise<ToDoItem[]> => {
  const response = await api.get<ToDoItem[]>(
    `/ToDo/fuzzysearch?searchTerm=${searchTerm}`
  );
  return response.data;
};
