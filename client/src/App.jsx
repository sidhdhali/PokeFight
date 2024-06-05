import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Menu, Container , Header } from 'semantic-ui-react';
import Pokemon from './component/Pokemon';
import PokemonById from './component/PokemonById';
import PokemonInfo from './component/PokemonInfo';
import Home from './component/Home';
import Game from './component/Game';
import Leaderboard from './component/Leaderboard';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  return (

    <div className='App'>
      <Header as='h1' inverted color='red'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M12 21c4.418 0 8-1.79 8-4c0-.977-.84-1.532-1.052-2.411c-.12-.496.052-1.078.052-1.589a7 7 0 0 0-.751-3.158C20.126 8.212 22 5.606 22 3c-4.153 0-6.257 2.35-6.9 3.722a7.06 7.06 0 0 0-6.2 0C8.257 5.349 6.153 3 2 3c0 2.606 1.874 5.213 3.751 6.842A7 7 0 0 0 5 13c0 .511.172 1.093.053 1.589C4.84 15.468 4 16.023 4 17c0 2.21 3.582 4 8 4"/><path d="M11 16c.793.66 1.206.674 2 0m-4-3.5h-.009m6.017 0h-.009m-9.891 1.523c1.254.402 3.085 2.709.677 4.915m13.107-4.895c-1.254.4-3.084 2.708-.677 4.914"/></g></svg>
        PokeFight
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m4.5 17.42l1.08 1.08l-2.3 2.28c-.28.29-.78.29-1.06 0s-.29-.78 0-1.06zm13.79-12V4L12 10.29L5.71 4v1.42L11.29 11L7.5 14.81c-1.18-.84-2.82-.74-3.87.31l4.25 4.25c1.05-1.05 1.15-2.69.32-3.87zm3.49 14.3l-2.28-2.3l-1.08 1.08l2.3 2.28c.28.29.78.29 1.06 0s.29-.78 0-1.06m-5.28-4.91l-3.08-3.1l-.71.71l3.1 3.08c-.84 1.18-.74 2.82.31 3.87l4.25-4.25c-1.05-1.05-2.69-1.15-3.87-.31" /></svg>
      </Header>
        <Menu pointing secondary>
          <Container className='navList'>
          <Menu.Item
            as={NavLink}
              to="/"
              name="Pokemons"
              exact="true"
              activeClassName="active"
            />
            <Menu.Item
              as={NavLink}
              to="/pokemon"
              name="Single Pokemon"
              activeClassName="active"
            />
            <Menu.Item
              as={NavLink}
              to="/game"
              name="Game"
              activeClassName="active"
            />
            {/*     <Menu.Item
              as={NavLink}
              to="/leaderboard"
              name="Leaderboard"
              activeClassName="active"
            />  */}
          </Container>
        </Menu>
        <Container>
          <Routes>
          <Route path="/" element={<Home />} />
             <Route path="/pokemon" element={<Pokemon />} /> 
            <Route path="/pokemon/:id" element={<PokemonById />} />
            <Route path="/pokemon/:id/:info" element={<PokemonInfo />} />
            <Route path="/game" element={<Game />} />
          {/*  <Route path="/leaderboard" element={<Leaderboard />} /> */}
          </Routes>
        </Container>
      </div>

  );
}

export default App;

// <Route path="/pokemon" element={<Pokemon />} />