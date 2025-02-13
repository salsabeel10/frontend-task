import { Link } from 'react-router-dom'


const Navbar = () => {
    
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Blog App</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/add"}>
            <p className='text-lg'>Add Post</p>
            </Link>
          </li>
          
        </ul>
      </div>
    </div>
  )
}

export default Navbar
