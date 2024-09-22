import MockAdapter from 'axios-mock-adapter';
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  toggleComplete,
  searchTodos,
  api,
} from '../services/todoService';

const mock = new MockAdapter(api);

describe('Todo Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should fetch all todos', async () => {
    const todos = [{ id: 1, text: 'Test Todo', isCompleted: false }];
    // const mock = new MockAdapter(axios);
    mock.onGet('/todo').reply(200, todos);
    const result = await fetchTodos();

    expect(result).toEqual(todos);
  });

  it('should add a new todo', async () => {
    const newTodo = { text: 'New Todo', isCompleted: false };
    const addedTodo = { id: 2, ...newTodo };
    //mock.mockResolvedValue({ data: addedTodo });
    mock.onPost('/todo').reply(200, addedTodo);

    const result = await addTodo(newTodo);

    //expect(mock.post).toHaveBeenCalledWith('/todo', newTodo);
    expect(result).toEqual(addedTodo);
  });

  it('should delete a todo', async () => {
    const id = 1;
    //mock.mockResolvedValue({ data: {} });
    mock.onDelete(`/todo/${id}`).reply(200, {});

    const result = await deleteTodo(id);

    //expect(mock.delete).toHaveBeenCalledWith(`/todo/${id}`);
    expect(result).toEqual({});
  });

  it('should toggle the completion status of a todo', async () => {
    const todo = { id: 1, text: 'Test Todo', isCompleted: false };
    const updatedTodo = { ...todo, isCompleted: true };
    //mockedAxios.mockResolvedValue({ data: updatedTodo });
    mock.onPut(`/todo/${todo.id}`).reply(200, updatedTodo);

    const result = await toggleComplete(todo);

    //expect(mockedAxios.put).toHaveBeenCalledWith(`/todo/${todo.id}`, todo);
    expect(result).toEqual(updatedTodo);
  });

  it('should search todos using fuzzy search', async () => {
    const searchTerm = 'Test';
    const searchResults = [{ id: 1, text: 'Test Todo', isCompleted: false }];
    //mockedAxios.mockResolvedValue({ data: searchResults });
    mock
      .onGet(`/ToDo/fuzzysearch?searchTerm=${searchTerm}`)
      .reply(200, searchResults);

    const result = await searchTodos(searchTerm);

    // expect(mockedAxios.get).toHaveBeenCalledWith(
    //   `/ToDo/fuzzysearch?searchTerm=${searchTerm}`
    // );
    expect(result).toEqual(searchResults);
  });
});
