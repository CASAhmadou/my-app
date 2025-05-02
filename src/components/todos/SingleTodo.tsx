import React, { useState } from 'react';
import { Todo } from '../../models/entity';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone} from "react-icons/md";
import "../styles.css";
import { deleteTodo, updateTodo } from '../../services/api';
import { error } from 'node:console';

const IEdit = AiFillEdit as unknown as React.FC;
const IDelete = AiFillDelete as unknown as React.FC;
const IDone = MdDone as unknown as React.FC;

type Props = {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo = ({todo, todos, setTodos}: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(todo.todo);

  const handleDone = async () => {
    try {
      const updated = await updateTodo(todo.id, {todo: todo.todo, isDone: !todo.isDone});
      setTodos(todos.map(t => t.id === todo.id ? updated: t));
    } catch (err) {
      console.error("Erreur mise à jour", err);
    }
  }

  const handleEdit = async (e?: React.FormEvent | React.FocusEvent) => {
    if(e) e.preventDefault?.();
    try {
      if(!editText.trim()) return;
      const updated = await updateTodo(todo.id, { todo: editText });
      setTodos(todos.map(t => t.id === todo.id ? updated : t));
      setEditMode(false);
    } catch (e) {
      console.error("Erreur mise à jour texte", e);
    }
  }

  const handleDelete = (id: number) => {
    const confirm = window.confirm("Voulez-vous vraiment supprimer ce todo")
    try {
      if(confirm){
        deleteTodo(todo.id);
        setTodos(todos.filter(t => t.id !== todo.id));
      }
    } catch (e) {
      console.error("Erreur suppression", e);
    }
  }

  return (
    <form onSubmit={handleEdit} className="todos_single">
      {editMode ? (
        <input className='todos_single--text'
          value={editText} onChange={(e) => setEditText(e.target.value)} 
          onBlur={handleEdit}
        />
      ) : (
        <span className={`todos_single--text ${todo.isDone ? 'done' : '' } `}>
            {todo.todo}
        </span>
      )}
        <div>
          {!todo.isDone && !editMode && (
            <span className="icon" onClick={() => setEditMode(true)}><IEdit /></span>
          )}
          {editMode && (
            <button type='submit' className='icon'>OK</button>
          )}
            <span className="icon" onClick={() => handleDelete(todo.id)}><IDelete /></span>
            <span className="icon" onClick={handleDone}><IDone /></span>
        </div>
    </form>
  )
}

export default SingleTodo