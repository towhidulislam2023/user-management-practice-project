import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Adduser from './Components/Adduser/Adduser.jsx';
import UpdateUser from './Components/UpdateUser/UpdateUser.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    loader: () => fetch("http://localhost:5000/users")
  },
  {
    path:"/adduser",
    element:<Adduser></Adduser>
  },
  {
    path:"/updateUser/:id",
    element:<UpdateUser></UpdateUser>,
    loader: ({params}) => fetch(`http://localhost:5000/users/${params.id}`)
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
