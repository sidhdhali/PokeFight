import { BrowserRouter as Router, Routes, Route, Link , NavLink } from 'react-router-dom';
import Pokemon from './component/Pokemon';
import PokemonById from './component/PokemonById'; 
import PokemonInfo from './component/PokemonInfo';
import './App.css'
import Home from './component/Home';

function App() {
  return (
    <div className='App'>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pokemon' element={<Pokemon />} />
      <Route path='/pokemon/:id' element={<PokemonById />} />
      <Route path='/pokemon/:id/:info' element={<PokemonInfo />} />
      </Routes>
      </div>
  );
}

export default App;

