import { NavLink } from "react-router-dom"

function Home() {
  return (
    <div>
      
<NavLink className='link' activeClassName='active-link' to='/pokemon'>
Pokemon data
</NavLink>
      
    </div>
  )
}

export default Home
