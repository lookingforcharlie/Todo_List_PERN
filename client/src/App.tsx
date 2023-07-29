import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer.tsx';
import Header from './components/Header';
import Home from './components/Home.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import TodoApp from './pages/TodoApp.tsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const user_token = localStorage.token;

  const checkIfAuthorized = async () => {
    console.log('Checking in App.tsx to see if token is valid.');
    if (!user_token) {
      return;
    } else {
      try {
        const requestOptions = {
          method: 'GET',
          headers: {
            authorization: `Bearer ${user_token}`,
          },
        };

        const res = await fetch(
          'http://localhost:3001/auth/is-verify',
          requestOptions
        );
        const data = await res.json();

        data === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

        console.log('Verified, isAuthenticated is:', isAuthenticated);
      } catch (error) {
        console.log((error as Error).message);
      }
    }
  };

  // Every time you refresh the page, if token is still valid, you don't need to login again
  useEffect(() => {
    checkIfAuthorized();
  }, []);

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
      <Footer />
    </BrowserRouter>
  );
}

export default App;

// This is actually the new way to do the router with creating a layout file

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
