import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from '../Pages/NotFound';
import Login from '../Pages/Login';
import Home from '@/Pages/Home';
import { PrivateRoute } from './privateRoutes';
import Ocorrencia from '@/Pages/Ocorrencia';
import Comprovante from '@/Pages/Comprovante';

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/inteliPost/ocorrencia"
          element={
            <PrivateRoute>
              <Ocorrencia />
            </PrivateRoute>
          }
        />
        <Route
          path="/inteliPost/comprovante"
          element={
            <PrivateRoute>
              <Comprovante />
            </PrivateRoute>
          }
        />
        {/* <Route path="/home" element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
        </Route> */}

        {/* <Route path="/khan/autorizacao/pagamento" element={<PrivateRoute />}>
          <Route
            path="/khan/autorizacao/pagamento"
            element={<AutorizacaoPagamento />}
          />
        </Route> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
