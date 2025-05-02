import React, { useEffect, useState } from 'react';
import './App.css';
import InputField from './components/InputFeild';
import { Todo } from './models/entity';
import TodoList from './components/TodoList';
import { addTodo, getTodos } from './services/api';

const App: React.FC =  () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const loadTodo = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        console.error("Erreur lors du chargement des todos", error);
      }
    };
    loadTodo();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if(todo){
      const newTodo = await addTodo(todo);
      setTodos([...todos, newTodo]);
      setTodo("");
    }
  };

  return (
    <div className="App">
      <span className='heading'>Task ToDay</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
