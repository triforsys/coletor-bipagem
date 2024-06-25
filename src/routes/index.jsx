import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from '../Pages/NotFound';
import Login from '../Pages/Login';
import Collects from '@/Pages/Collects';
import { PrivateRoute } from './privateRoutes';
import Transport from '@/Pages/Transport';
import Collect from '@/Pages/Collect';

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/coletas" element={<Collects />} />
        <Route path="/coleta/:id" element={<Collect />}  />
        <Route path="/transporte/:id" element={<Transport />} />
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
