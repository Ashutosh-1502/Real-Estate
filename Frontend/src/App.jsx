//importing all the methods and component from the react-router-dom for client side routing
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

//importing all the components
import Home from './pages/Home';
import About from './pages/About';
import Sign from './pages/Sign';
import SignupAndSignIn from './pages/SignupAndSignIn';
import Profile from './pages/Profile';
import Navbar1 from './components/Navbar1';
import { ProtectedProfile, ProtectedSignInAndSignup } from './components/ProtectedRoute';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Navbar1 />}>
        <Route path='/' element={<Home />} />
        <Route path='/about-us' element={<About />} />
        <Route element={<ProtectedProfile />}>
          <Route path='/profile-page' element={<Profile />} />
        </Route>
        <Route element={<ProtectedSignInAndSignup />}>
          <Route path='/auth/sign-in' element={
            <Sign childComponent={
              <SignupAndSignIn type='login' />} type='login' />
          } />
          <Route path='/auth/sign-up' element={
            <Sign childComponent={
              <SignupAndSignIn type='sign-up' />} type='sign-up' />
          } />
        </Route>
        <Route path='*' element={<Error />} />
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
