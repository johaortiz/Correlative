import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
const NavBar = lazy(() => import('./components/NavBar'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));

const App = () => {
  return (
    <>
      <Suspense fallback={<>loading</>}><NavBar /></Suspense>
      <Routes>
        <Route index element={<Suspense fallback={<>loading</>}><Home /></Suspense>} />
        <Route path="/login" element={<Suspense fallback={<>loading</>}><Login /></Suspense>} />
      </Routes>
    </>
  );
};
export default App;