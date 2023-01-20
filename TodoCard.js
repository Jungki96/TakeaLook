import React from "react";
// import { deleteTodo, onToggleTodo } from "./redux/modules/todos";

const TodoCard = ({ id, title, content, deleteTodo, toggleTodo }) => {
  return (
    <div key={id} style={{ border: "1px solid black", width: "300px" }}>
      <h2>{title}</h2>
      <div>{content}</div>
      <button onClick={() => deleteTodo(id)}>삭제하기</button>
      <button onClick={() => toggleTodo(id)}>완료하기</button>
    </div>
  );
};

export default TodoCard;
