//액션의 타입정의

export const ADD_TODO = "todos/ADD_TODO";
export const TOGGLE_TODO = "todos/TOGGLE_TODO";

//액션생성함수 정의
export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id,
});
//기본값
const initialState = {
  todoList: [
    {
      id: 0,
      title: "리액트",
      content: "공부하기",
      isComplete: false,
    },
  ],
  // todo: [{}], // 이거 없애기
};

//리듀서만들기
const todos = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todoList: [...state.todoList, action.payload],
      };
    case TOGGLE_TODO:
      const _todo = state.todoList.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, isComplete: !todo.isComplete };
        } else {
          return todo;
        }
      });
      return {
        ...state,
        todoList: _todo,
      };
    default:
      return state;
  }
};

export default todos;
