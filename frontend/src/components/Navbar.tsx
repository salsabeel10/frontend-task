import { Link } from 'react-router-dom'
import { FaPlusCircle } from 'react-icons/fa'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1 ">
        <ul className="menu menu-horizontal">
            <Link to={'/'}>
          <li className="border border-gray-400 rounded-4xl">
              <p className="btn btn-ghost text-xl">Blog App</p>
          </li>
            </Link>
        </ul>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal">
          <li className="border border-gray-400 rounded-4xl">
            <Link to={'/add'}>
              <p className="text-lg ">Add Post</p>
              <FaPlusCircle size={18} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
