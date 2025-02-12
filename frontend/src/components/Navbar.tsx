import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Possts</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <p className='text-lg'>Add Post</p>
          </li>
          
        </ul>
      </div>
    </div>
  )
}

export default Navbar
