'use client';

import { useEffect, useState } from 'react';
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  searchTodos,
  toggleComplete,
} from '../services/todoService';
import { ToDoItem } from '../types/ToDoItem';
import { ToDoItemCreate } from '@/types/ToDoItemCreate';

/**
 * Home component for the To-Do List application.
 * @returns {JSX.Element} The rendered component.
 */
export default function Home() {
  const [todos, setTodos] = useState<ToDoItem[]>([]);
  const [newTodoText, setNewTodoText] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const loadTodos = async () => {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    };
    loadTodos();
  }, []);

  /**
   * Handles adding a new to-do item.
   */
  const handleAddTodo = async () => {
    if (newTodoText.trim()) {
      const newTodo: ToDoItemCreate = {
        text: newTodoText,
        isCompleted: false,
      };
      // Call backend addTodo without depending on immediate UI state
      const addedTodo = await addTodo(newTodo);
      // Update the UI state with the added item
      setTodos([...todos, addedTodo]);
      setNewTodoText('');
    }
  };

  /**
   * Handles deleting a to-do item by ID.
   * @param {number} id - The ID of the to-do item to delete.
   */
  const handleDeleteTodo = async (id: number) => {
    // Call backend deleteTodo without depending on immediate UI state
    await deleteTodo(id);
    // Update the UI state by filtering out the deleted item
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  /**
   * Handles toggling the completion status of a to-do item.
   * @param {number} id - The ID of the to-do item to toggle.
   */
  const handleToggleComplete = async (id: number) => {
    // Update the UI state by toggling the isCompleted property
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );

    // Find the specific todo from the previous state
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      // Call backend toggleComplete without depending on immediate UI state
      toggleComplete({ ...todo, isCompleted: !todo.isCompleted });
    }
  };

  /**
   * Handles searching for to-do items.
   */
  const handleSearch = async () => {
    if (searchTerm.trim()) {
      // Call backend searchTodos without depending on immediate UI state
      const searchResults = await searchTodos(searchTerm);
      // Update the UI state with the search results
      setTodos(searchResults);
    }
  };

  /**
   * Clears the search and resets the to-do list.
   */
  const clearSearch = async () => {
    const fetchedTodos = await fetchTodos(); // Re-fetch all items
    setTodos(fetchedTodos); // Reset to original list
    setSearchTerm(''); // Clear the search input
  };

  return (
    <div>
      <div className="header">
        <h1>To-Do List</h1>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add new to-do"
          id="myInput"
        />
        <button onClick={handleAddTodo} className="addBtn">
          Add
        </button>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search todos"
        />
        <button onClick={handleSearch} className="addBtn">
          Search
        </button>
        <button onClick={clearSearch} className="addBtn">
          Clear Search
        </button>
      </div>
      <ul id="myUL">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={todo.isCompleted ? 'checked' : ''}
            onClick={() => handleToggleComplete(todo.id)}
          >
            <span>{todo.text}</span>
            <button
              className="deleteBtn"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
