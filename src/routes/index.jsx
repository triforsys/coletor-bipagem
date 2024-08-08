import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from '../Pages/NotFound'
import Login from '../Pages/Login'
import Collects from '@/Pages/Collects'
import { PrivateRoute } from './privateRoutes'
import Transport from '@/Pages/Transport'
import Collect from '@/Pages/Collect'
import BipBlocked from '@/Pages/BipBlocked'
import CollectBlocked from '@/Pages/CollectBlocked'

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
          path="/transporte/blocado"
          element={
            <PrivateRoute>
              <BipBlocked />
            </PrivateRoute>
          }
        />
        <Route
          path="/coleta/blocado/:id"
          element={
            <PrivateRoute>
              <CollectBlocked />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
