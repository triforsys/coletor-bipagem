import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from '../Pages/NotFound'
import Login from '../Pages/Login'
import Collects from '@/Pages/Collects'
import { PrivateRoute } from './privateRoutes'
import Transport from '@/Pages/Transport'
import Collect from '@/Pages/Collect'
import Region from '@/Pages/Region'

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/coletas"
          element={
            <PrivateRoute>
              <Collects />
            </PrivateRoute>
          }
        />
        <Route
          path="/coleta/:id"
          element={
            <PrivateRoute>
              <Collect />
            </PrivateRoute>
          }
        />
        <Route
          path="/transporte"
          element={
            <PrivateRoute>
              <Transport />
            </PrivateRoute>
          }
        />

        <Route
          path="/regiao/:ordemColeta/:idColeta"
          element={
            <PrivateRoute>
              <Region />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
