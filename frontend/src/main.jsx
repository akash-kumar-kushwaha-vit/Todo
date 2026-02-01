
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import App from './App.jsx'
import Login from './page/Login/Login.jsx'
import Register from './page/Register/Register.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './page/Home/Home.jsx'
import Todo from './page/Todo/Todo.jsx'
import Todoitem from './page/Todo/Todoitem.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App />} >
      <Route index element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/todo' element={<Todo />} />
      <Route path='/todoitem' element={<Todoitem />} />



    </Route>

  )
)
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
