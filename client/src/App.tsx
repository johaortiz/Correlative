import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import ProtectedRoute from './AuthGuard';
const NavBar = lazy(() => import('./components/NavBar'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Denied = lazy(() => import('./pages/Denied'));
const Exit = lazy(() => import('./pages/Exit'));
const AdminTable = lazy(() => import('./pages/admin/Table'));
const AdminAdd = lazy(() => import('./pages/admin/Add'));


const App = () => {

  const location = useLocation();
  const token: string = Cookies.get("token") || "";
  const paths = ["/", "/perfil", "/acceso", "/registro", "/anadir", "/tablas"];

  return (
    <>
      {
        paths.includes(location.pathname) && <Suspense fallback={<>loading</>}><NavBar /></Suspense>
      }
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route index element={<Suspense fallback={<>loading</>}><Home /></Suspense>} />
          <Route element={<ProtectedRoute isAllowed={!!token} redirectTo='/denegado' />} >
            <Route path="/perfil" element={<Suspense fallback={<>loading</>}><Profile /></Suspense>} />
          </Route>
          <Route element={<ProtectedRoute isAllowed={!!token} redirectTo='/denegado' />} >
            <Route path="/tablas" element={<Suspense fallback={<>loading</>}><AdminTable /></Suspense>} />
            <Route path="/anadir" element={<Suspense fallback={<>loading</>}><AdminAdd /></Suspense>} />
          </Route>
          <Route path="/denegado" element={<Suspense fallback={<>loading</>}><Denied /></Suspense>} />
          <Route element={<ProtectedRoute isAllowed={!token} redirectTo='/salir' />} >
            <Route path="/acceso" element={<Suspense fallback={<>loading</>}><Login /></Suspense>} />
            <Route path="/registro" element={<Suspense fallback={<>loading</>}><Register /></Suspense>} />
          </Route>
          <Route path="/salir" element={<Suspense fallback={<>loading</>}><Exit /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<>loading</>}><NotFound /></Suspense>} />
        </Routes>
      </AnimatePresence>
    </>
  );
};
export default App;