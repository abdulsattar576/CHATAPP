
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/home/Home.jsx';
import Login from './Pages/authentication/Login.jsx';
import Signup from './Pages/authentication/Signup.jsx';
import { store } from './store/Store.js';
import {Provider} from "react-redux"
import ProtectedRoutes from './components/utils/ProtectedRoutes.jsx';
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <ProtectedRoutes><Home/></ProtectedRoutes>,
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/signup",
      element:<Signup/>
    }
  ],
);


 

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <App />
  <RouterProvider router={router}/>
  </Provider>,
)
