import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './pages.css'
import InputField from '../components/todos/InputFeild';
import { Todo } from '../models/entity';
import TodoList from '../components/todos/TodoList';
import { addTodo, getTodos } from '../services/api';
import { isAuthenticated } from '../utils/auth';


const Todos = () => {
    const navigate = useNavigate();
    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        if(!isAuthenticated()){
            navigate("/login");
        }else{
            loadTodo();
        }
    }, [navigate]);

    const loadTodo = async () => {
        try {
          const data = await getTodos();
          setTodos(data);
        } catch (error) {
          console.error("Erreur lors du chargement des todos", error);
        }
    };

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
  )
}

export default Todos