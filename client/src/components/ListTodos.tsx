import { FC, useEffect, useMemo } from 'react';
import { TodoList } from '../pages/TodoApp';
import EditTodoModal from './EditTodoModal';
interface ListTodosProps {
  todoList: TodoList[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoList[]>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListTodos: FC<ListTodosProps> = ({
  todoList,
  setTodoList,
  setIsAuthenticated,
}) => {
  const user_token = localStorage.token;

  // const memoizedTodoList = useMemo(() => todoList, [todoList]);

  // Add signal as parameter to server the purpose of clean-up function in useEffect
  const retrieveTodos = async (signal: AbortSignal) => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          authorization: `Bearer ${user_token}`,
        },
      };
      const response = await fetch('http://localhost:3001/todos/', {
        signal,
        ...requestOptions,
      });

      // handle jwt expired situation, I set up jwt for 5 minutes right now
      if (response.status === 403) {
        console.log('token expired');
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      }

      const data = await response.json();
      setTodoList(data);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    retrieveTodos(signal);

    return () => {
      controller.abort();
    };
  }, []);

  const handleDelete = async (id: number) => {
    console.log('I am deleting todo of id: ', id);
    const response = await fetch(`http://localhost:3001/todos/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${user_token}`,
      },
    });
    const data = await response.json();
    setTodoList(data);
    // I am retrieving todo list from server to get latest list
    // We also can use filter to delete the todo from the frontend as follows
    // setTodoList(todoList.filter(todo => todo.todo_id !== id));
    // which one is better?
  };
  return (
    <div className='mt-6 mx-4 sm:mx-0 sm:w-[600px] lg:w-[750px] border-0 border-zinc-100 rounded-md'>
      {todoList.length > 0 ? (
        todoList.reverse().map((todo) => (
          <div
            key={todo.todo_id}
            className='flex justify-between items-center border border-b-1 py-2 px-2 mb-2 rounded-md'
          >
            <label className='text-zinc-600 flex flex-wrap items-center gap-2 hover:cursor-pointer'>
              <input
                type='checkbox'
                checked={todo.isFinished}
                onChange={() => console.log('check')}
              />
              <span
                style={{
                  textDecoration: todo.isFinished ? 'line-through' : 'none',
                }}
              >
                {todo.description}
              </span>
            </label>
            <div className='flex gap-4 ml-6'>
              <EditTodoModal
                todoItem={todo.description}
                todoId={todo.todo_id}
                setTodoList={setTodoList}
                todoList={todoList}
              />
              <button
                className='border border-gray-400 rounded-md px-4 shadow-xs'
                onClick={() => handleDelete(todo.todo_id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>You got nothing to do?</div>
      )}
    </div>
  );
};

export default ListTodos;
