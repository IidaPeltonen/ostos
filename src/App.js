import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';

const URL = 'http://localhost/ostosphp/';

function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('')
  const [amount, setAmount] = useState('')

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        console.log(response.data)
        setItems(response.data)
      }).catch(error => {
        alert(error);
      })
  }, [])

  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({description:item, amount:amount})
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

  function remove(id) {
    const json= JSON.stringify({id:id})
    axios.post(URL + 'delete.php', json, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      const newListWithoutRemoved = items.filter((item) => item.id !== id);
      setItems(newListWithoutRemoved);
    }).catch (error => {
      alert(error.response ? error.response.data.error : error);
    });
  }
/* 
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
        <label>Lisää tuote</label>
        <input value={item} placeholder="nimi" onChange={e => setItem(e.target.value)} />
        <input value={amount} placeholder = "määrä" onChange={e => setAmount(e.target.value)} />
        <button>Tallenna</button>
      </form>
      <table>
        {items?.map(item => (
          <tr key={item.id}><td hidden>{item.id}</td><td id="vali">{item.description}</td><td id="toka">{item.amount}</td>          <a href="#" className="delete" onClick={() => remove(item.id)}>
            Delete
          </a>
          </tr>
        ))}
      </table>



      {/* <ul class="a">
        {items?.map(item => (
          <li key={item.id} >&nbsp;    
          {item.description}&nbsp;{item.amount}&nbsp;
          <a href="#" className="delete" onClick={() => remove(item.id)}>
            Delete
          </a>
          </li>
        ))}
      </ul> */}
    </div>
    
  )
}

export default App;