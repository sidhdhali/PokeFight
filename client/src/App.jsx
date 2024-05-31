import { BrowserRouter as Router, Routes, Route, Link , NavLink } from 'react-router-dom';
import Pokemon from './component/Pokemon';
import PokemonById from './component/PokemonById'; 
import PokemonInfo from './component/PokemonInfo';
import './App.css'
import Home from './component/Home';
import Game from './component/Game';

function App() {
  return (
    <div className='App'>
      
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/pokemon' element={<Pokemon />} />
      <Route path='/pokemon/:id' element={<PokemonById />} />
      <Route path='/pokemon/:id/:info' element={<PokemonInfo />} />
      <Route path='/game' element={<Game />} />
      </Routes>
      </div>
  );
}

export default App;


<Route  path="/game" element={<Game />} />