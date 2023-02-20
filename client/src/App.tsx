import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
const NavBar = lazy(() => import('./components/NavBar'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

const App = () => {
  return (
    <>
      <Suspense fallback={<>loading</>}><NavBar /></Suspense>
      <Routes>
        <Route index element={<Suspense fallback={<>loading</>}><Home /></Suspense>} />
        <Route path="/acceso" element={<Suspense fallback={<>loading</>}><Login /></Suspense>} />
        <Route path="/registro" element={<Suspense fallback={<>loading</>}><Register /></Suspense>} />
      </Routes>
    </>
  );
};
export default App;