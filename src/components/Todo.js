import { useEffect, useState } from 'react';
import { useAuth } from './Context';

function Todo() {
  const { token} = useAuth(); 
  const [todos, setTodos] = useState([]);
  const getTodo = () => {
    const _url = "https://todoo.5xcamp.us/todos";
    fetch(_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      }
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        setTodos(res.todos)
      })
  }
  useEffect(() => {
    getTodo()
  }, [])
  return (
    <main>
      <h1>歡迎來到</h1>
      <ul>
        {
            todos.map((todo,i)=>{
                return (
                    <li key={i}>{todo.content}</li>
                )
            })
        }
      </ul>
    </main>
  );
}

export default Todo;
