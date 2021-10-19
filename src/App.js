import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';

const URL = 'http://localhost/ostosphp/';

function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('')
 
  /* const [editTask, setEditTask] = useState(null);
  const [editDescription, setEditDescription] = useState(''); */

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        console.log(response.data)
        setItems(response.data)
      }).catch(error => {
        alert(/* error.response ? error.response.data.error :  */error);
      })
  }, [])

  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({description:item, amount:item})
    axios.post(URL + 'add.php',json,{
      headers: {
        'Content-Type' : 'applicationJ/json'
      }
    })
    .then((response) => {
      setItems(Items => [...items,response.data]);
      setItem('');
    }).catch (error => {
      alert(error.response.data.error)
    })
  }
/* 
  function remove(id) {
    const json= JSON.stringify({id:id})
    axios.post(URL + 'delete.php', json, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      const newListWithoutRemoved = tasks.filter((item) => item.id !== id);
      setTasks(newListWithoutRemoved);
    }).catch (error => {
      alert(error.response ? error.response.data.error : error);
    });
  }

  function setEditedTask(task) {
    setEditTask(task);
    setEditDescription(task?.description);
  }

  function update(e) {
    e.preventDefault();
    const json= JSON.stringify({id:editTask.id, description:editDescription})
    axios.post(URL + 'update.php', json, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      tasks[(tasks.findIndex(task => task.id === editTask.id))].description = editDescription;
      setTasks([...tasks]);
      setEditedTask(null);
    }).catch (error => {
      alert(error.response ? error.response.data.error : error);
    });
  } 

 return (
    <div className="container">
      <h3>Todo list</h3>
      <form onSubmit={save}>
        <label>New task</label>
        <input value={task} onChange={e => setTask(e.target.value)} />
        <button>Save</button>
      </form>
      <ol>
        {tasks?.map(task => (
          <li key={task.id}>
            {editTask?.id !== task.id &&
            task.description
            }
            {editTask?.id === task.id &&
            <form onSubmit={update}>
              <input value={editDescription} onChange={e => setEditDescription(e.target.value)}/>
              <button>Save</button>
              <button type="button" onClick={() => setEditedTask(null)}>Cancel</button>
              </form>
            }
            <a className="delete" onClick={() => remove(task.id)} href="#">
              Delete
            </a>&nbsp;
            {editTask === null &&
              <a className="edit" onClick={() => setEditedTask(task)} href="#">
                Edit
              </a>
            }
          </li>
        ))}
      </ol>
    </div>
  ); */

  return (
    <div className="container">
      <h1>Kauppalista</h1>
      <form onSubmit={save}>
        <label>New item</label>
        <input placeholder="item name" value={item.description} onChange={e => setItem(e.target.value)} />
        <input placeholder="amount" value={item.amount} onChange={e => setItem(e.target.value)} />
        <button>Save</button>
      </form>
      <ol>
        {items?.map(item => (
          <li key={item.id}>{item.description}{item.amount}</li>
        ))}
      </ol>
    </div>
  )
}

export default App;