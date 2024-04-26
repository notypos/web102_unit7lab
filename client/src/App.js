import './App.css';
import React, {useState} from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import { Link } from 'react-router-dom'
import DetailsPage from './pages/DetailsPage';


const App = () => {

  const descr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  const [query, setQuery] = useState('')

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: <ReadPosts query={query} />
    },
    {
      path: "/edit/:id",
      element: <EditPost />
    },
    {
      path: "/new",
      element: <CreatePost />
    },
    {
      path: "/details/:id",
      element: <DetailsPage />
    }
  ]);

  return (

    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-custom">
        <div className='container'>
          <Link className="navbar-brand" to={"/"}>Forum</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to={"/"}>Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/new"}>New Post</Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0 ml-auto">
              <input className="form-control mr-sm-2" value={query} onChange={e=>setQuery(e.target.value)}  type="search" placeholder="Search" aria-label="Search" />
            </form>
          </div>
        </div>
      </nav>
      <div className='container'>
        {element}
      </div>
    </div>

  );
}

export default App;