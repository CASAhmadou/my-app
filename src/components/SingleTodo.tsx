import React from 'react';
import { Todo } from '../models/entity';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone} from "react-icons/md";
import "./styles.css";

const IEdit = AiFillEdit as unknown as React.FC;
const IDelete = AiFillDelete as unknown as React.FC;
const IDone = MdDone as unknown as React.FC;

type Props = {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo = ({todo, todos, setTodos}: Props) => {
  return (
    <form action="" className="todos_single">
        <span className="todos_single--text">
            {todo.todo}
        </span>
        <div>
            <span className="icon"><IEdit /></span>
            <span className="icon"><IDelete /></span>
            <span className="icon"><IDone /></span>
        </div>
    </form>
  )
}

export default SingleTodo