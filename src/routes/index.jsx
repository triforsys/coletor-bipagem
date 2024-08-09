import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from '../Pages/NotFound'
import Login from '../Pages/Login'
import Collects from '@/Pages/Collects'
import { PrivateRoute } from './privateRoutes'
import Collect from '@/Pages/Collect'
import CollectBlocked from '@/Pages/CollectBlocked'
import Bipagem from '@/Pages/Bipagem'

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
          path="/bipagem/:id"
          element={
            <PrivateRoute>
              <Bipagem />
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
