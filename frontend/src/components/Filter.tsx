import { IoFilter } from 'react-icons/io5'
import { usePostStore } from '../store/postStore'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

const Filter = () => {
    const { toggleSortOrder,sortOrder } = usePostStore()
  return (
    <div>
      <details className="dropdown">
        <summary className="btn btn-ghost text-black m-1 mr-5">
          <IoFilter />
        </summary>
        <ul
          className="menu dropdown-content bg-white rounded-box z-10 p-0 w-30 border border-gray-300 shadow-sm"
          style={{ right: -18 }}
        >
          <li onClick={toggleSortOrder}>
            <a className="flex items-center">
              {sortOrder === 'asc' ? (
                <>
                  <FaArrowUp className="text-green-500" />
                  <span>Ascending</span>
                </>
              ) : (
                <>
                  <FaArrowDown className="text-red-500" />
                  <span>Descending</span>
                </>
              )}
            </a>
          </li>
        </ul>
      </details>
    </div>
  )
}

export default Filter
