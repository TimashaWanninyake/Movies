import { useEffect, useState } from 'react'
import './App.css'
import { getAllActors } from './services/actor.service';

function App() {

  const [actors, setActors] = useState([]);

  useEffect(() => {
    getAllActors().then((data: any) => setActors(data));
  }, []);

  return (
    <>
      <div>
        <h2>Actors</h2>
        <ul>
          {actors.map((actor: any) => (
            <li key={actor.id}>
              {actor.name} {actor.age}
            </li>
          ))}
        </ul>
        <h2>Actors Count: {actors.length}</h2>
      </div>
    </>
  )
}

export default App;
