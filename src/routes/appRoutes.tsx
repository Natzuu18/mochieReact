import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './protectedRoutes';

import Home from '../App';
import CustomerHome from '../pages/customer/home';


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/App" element={<Home/>} />
      <Route path="/main" element={<Home/>} />

      <Route
        path="/customer/home"
        element={
          <ProtectedRoute>
            <CustomerHome />
          </ProtectedRoute>
        }
      />
     
    </Routes>
  );
}
