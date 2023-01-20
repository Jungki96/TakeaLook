import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addTodo, toggleTodo } from "./redux/modules/todos";
import TodoCard from "./TodoCard";

function App() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [todoList, setTodoList] = useState([]);
  const todoList = useSelector((state) => state.todos.todoList);

  const onaddTodo = () => {
    const todo = {
      id: todoList.length,
      title: title,
      content: content,
      isComplete: false,
    };
    // setTodoList([...todoList, todo]);
    dispatch(addTodo(todo));
  };

  const deleteTodo = (id) => {
    const _todos = todoList.filter((p) => p.id !== id);
    // setTodoList(_todos);
  };
  const onToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };
  return (
    <>
      <div>
        <div>
          <span>제목</span>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          ></input>
        </div>
        <div>
          <span>내용</span>
          <input
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></input>
        </div>
        <button onClick={onaddTodo}>작성하기</button>
      </div>
      <div>
        <div>
          <h1>Working..</h1>
          {todoList
            .filter((todo) => !todo.isComplete)
            .map((todo) => {
              return (
                <TodoCard
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  content={todo.content}
                  deleteTodo={() => deleteTodo(todo.id)}
                  toggleTodo={() => onToggleTodo(todo.id)}
                />
              );
            })}
        </div>
        <div>
          <h1>completed..</h1>
          {todoList
            .filter((todo) => todo.isComplete)
            .map((todo) => {
              return (
                <TodoCard
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  content={todo.content}
                  deleteTodo={() => deleteTodo(todo.id)}
                  toggleTodo={() => onToggleTodo(todo.id)}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
