'use client';

import { useEffect, useState } from 'react';
import { fetchTodos, addTodo, deleteTodo, searchTodos, toggleComplete } from '../services/todoService';
import { ToDoItem } from '../types/ToDoItem';
import { ToDoItemCreate } from '@/types/ToDoItemCreate';


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

  const handleAddTodo = async () => {
    if(newTodoText.trim()) {
      const newTodo: ToDoItemCreate = {
        text: newTodoText,
        isCompleted: false
      };
      const addedTodo = await addTodo(newTodo);
      setTodos([...todos, addedTodo]);
      setNewTodoText('');
    }
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleComplete = async (id: number) => {

    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );

    // Find the specific todo from the previous state
    const todo = todos.find(t => t.id === id);
    if (todo) {
      // Call backend toggleComplete without depending on immediate UI state
      toggleComplete({ ...todo, isCompleted: !todo.isCompleted });
    }
  };

const handleSearch = async () => {
  if(searchTerm.trim()) {
    const searchResults = await searchTodos(searchTerm);
    setTodos(searchResults);
  }
};

const clearSearch = async () => {
  const fetchedTodos = await fetchTodos(); // Re-fetch all items
  setTodos(fetchedTodos); // Reset to original list
  setSearchTerm(''); // Clear the search input
};

return(
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
    <button onClick={handleAddTodo} className="addBtn">Add</button>
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search todos"
    />
    <button onClick={handleSearch} className="addBtn">Search</button>
    <button onClick={clearSearch} className="addBtn">Clear Search</button>
  </div>
  <ul id='myUL'>
    {todos.map(todo => (
      <li key={todo.id} className={todo.isCompleted ? 'checked' : ''}  onClick={() => handleToggleComplete(todo.id)}>
        <span>{todo.text}</span>
        <button className='deleteBtn' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
      </li>
    ))}
  </ul>
</div>
);



    }