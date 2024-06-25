import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from '../Pages/NotFound';
import Login from '../Pages/Login';
import Home from '@/Pages/Home';
import { PrivateRoute } from './privateRoutes';
import Report from '@/Pages/Report';

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/coleta/:id" element={<Report />}  />
        {/* <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        /> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
