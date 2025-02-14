import { IoFilter } from 'react-icons/io5'
const Filter = () => {
  return (
    <div>
      <details className="dropdown">
        <summary className="btn btn-ghost text-black m-1"><IoFilter /></summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li>
            <a>Alphabetically</a>
          </li>
          <li>
            <a>Number</a>
          </li>
        </ul>
      </details>
    </div>
  )
}

export default Filter
