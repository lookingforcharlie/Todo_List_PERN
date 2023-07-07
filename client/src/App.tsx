import { useState } from 'react';
import Input from './components/Input';
import ListTodos from './components/ListTodos';

export type TodoList = {
  todo_id: number;
  description: string;
  email: string;
  create_date: string;
  isFinished: boolean;
};

function App() {
  const [todoList, setTodoList] = useState<TodoList[]>([]);

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='flex flex-col items-center justify-center mt-12'>
        <h1 className='text-3xl capitalize '>Todo List with PERN Stack</h1>
        <Input setTodoList={setTodoList} />
        <ListTodos todoList={todoList} setTodoList={setTodoList} />
      </div>
    </div>
  );
}

export default App;
