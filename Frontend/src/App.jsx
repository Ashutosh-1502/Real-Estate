//importing all the methods and component from the react-router-dom for client side routing
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

//importing all the components
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Navbar1 from './components/Navbar1';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Navbar1 />}>
        <Route path='/' element={<Home />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/profile-page' element={<Profile/>}/>
        <Route path='/auth/sign-in' element={<Signin />} />
        <Route path='/auth/sign-up' element={<Signup />} />
        <Route path='*' element={<Error/>}/>
      </Route>
    )
  )
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
