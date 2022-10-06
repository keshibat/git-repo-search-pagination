import { useState, useMemo } from 'react'
import Pagination from './components/pagination/pagination.component'
import './styles.scss'

let PageSize = 10

export default function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [ repos, setRepos ] = useState([])
  const [ searchInput, setSearchInput ] = useState('')

  const handleChange = (e) => {
    setSearchInput(e.target.value)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if(!searchInput) {
      alert('please enter some keywords')
      return
    }
    const data = await fetch(`https://api.github.com/search/repositories?q=${searchInput}+in:name&sort=stars`)
    const repositories = await data.json()
    console.log(repositories.items)
    if(data) {
      setRepos(repositories.items)
    }
  }

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return repos.slice(firstPageIndex, lastPageIndex)
  }, [repos, currentPage])

  return (
    <>
      <div>
        <input type="text" placeholder="search repositories" value={searchInput} onChange={handleChange}/>
        <button type="submit" onClick={submitHandler}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>fork</th>
            <th>language</th>
            <th>Update At</th>
          </tr>
        </thead>
        { <tbody>
          {currentTableData && currentTableData.map(repo => {
            return (
              <tr key={repo.id}>
                <td><a href={repo.clone_url}>{repo.name}</a></td>
                <td>{repo.description}</td>
                <td>{repo.forks_count}</td>
                <td>{repo.language}</td>
                <td>{repo.updated_at}</td>
              </tr>
            );
          })}
        </tbody> }
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={repos.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
}