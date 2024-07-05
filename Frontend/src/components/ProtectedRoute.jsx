import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedProfile() {
  const currentUser = useSelector(state => state.user.currentUser);
  return currentUser ? <Outlet /> : <Navigate to='/auth/sign-in' />
}

function ProtectedSignInAndSignup() {
  const currentUser = useSelector(state => state.user.currentUser);
  return currentUser ? <Navigate to='/' /> : <Outlet />
}

export { ProtectedProfile , ProtectedSignInAndSignup };
