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
        'Content-Type' : 'application/json'
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
    </div>
    
  )
}

export default App;