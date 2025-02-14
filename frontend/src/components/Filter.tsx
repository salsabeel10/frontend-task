import { IoFilter } from 'react-icons/io5'
import { usePostStore } from '../store/postStore'

const Filter = () => {
    const { toggleSortOrder,sortOrder } = usePostStore()
  return (
    <div>
      <details className="dropdown">
        <summary className="btn btn-ghost text-black m-1">
          <IoFilter />
        </summary>
        <ul className="menu dropdown-content bg-white rounded-box z-10 w-36 p-2 shadow-sm">
          <li onClick={toggleSortOrder}>
            <a>{sortOrder === 'asc' ? '⬆ Ascending' : '⬇ Descending'}</a>
          </li>
        </ul>
      </details>
    </div>
  )
}

export default Filter
