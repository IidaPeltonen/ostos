import './App.css';
import {useState,useEffect} from 'react';
import axios from 'axios';

const URL= 'http://localhost/ostosphp/index.php';

function App() {
  /* const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setTasks(response.data)
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      })
  }, [])
 */
  return (
    <div className="container">
      <ol>
        <li>laalaa</li>
        <li>pai</li>
        <li>hipsu</li>
        <li>tiivitaavi</li>

      </ol>
    </div>
  );
}

export default App;