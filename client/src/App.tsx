import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import TodoApp from './pages/TodoApp.tsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const setAuth = (boolean: boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <BrowserRouter>
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route
            path='/login'
            element={
              isAuthenticated === true ? (
                <Navigate replace to='/todos' />
              ) : (
                <LoginPage setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path='/register'
            element={
              isAuthenticated === true ? (
                <Navigate replace to='/todos' />
              ) : (
                <RegisterPage setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path='/todos'
            element={
              isAuthenticated === true ? (
                <TodoApp setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate replace to='/login' />
              )
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

// This is actually the new way to do the router

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<MasterLayout />}>
//       {/* index equals to path='/' */}
//       <Route index element={<Home />} />
//       <Route path='/login' element={<LoginPage />} />
//       <Route path='/register' element={<RegisterPage />} />
//       <Route path='/todos' element={<TodoApp />} />
//     </Route>
//   )
// );
