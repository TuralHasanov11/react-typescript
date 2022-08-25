import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Admin from './components/Admin';
import ErrorMessage from './components/ErrorMessage';
import Home from './components/Home';
import Layout from './components/Layout';
import Login from './components/Login';
import Product from './components/Product';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';
import Unautorized from './components/Unautorized';
import { useProducts } from './hooks/products';
import PersistLogin from './components/PersistLogin';

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150
}

function App() {

  const {loading, error, products} = useProducts()

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unautorized />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Navigate to="/" replace={true}  />} />
      </Route>
    </Routes>
  );
}

export default App;
 