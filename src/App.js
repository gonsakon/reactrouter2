import './css/App.css';
import { useState } from 'react';
import FAQ from './components/FAQ.js';
import Tour from './components/Tour.js';
import TourDetail from './components/TourDetail.js';
import TourList from './components/TourList.js';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Todo from './components/Todo';
import { AuthContext } from "./components/Context";
import { Routes, Route, Link,Outlet } from "react-router-dom";
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './components/Context';
function Home() {
  return (
    <>
      <main>
        <h2>首頁</h2>
        <p>歡迎來到首頁</p>
      </main>
      
    </>
  );
}
function Layout() {
  const { token} = useAuth(); 
  return (
    <>
      <div className="header">
      表頭
      <nav>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/faq'>faq</Link>
        </li>
        <li>
          <Link to='/tour'>Tour</Link>
        </li>
        <li>
          <Link to='/signup'>signup</Link>
        </li>
        <li>
          <Link to='/login'>login</Link>
        </li>
        {
          token && <li>
          <Link to='/todo'>todo</Link>
        </li>
        }
      </nav>
      </div>
      <div className="content">
        <Outlet />
      </div>
      <div className="footer">表尾</div>
    </>
  );
}
function App() {
  const [token, setToken] = useState(null);
  return (
    <div className="App">
      <AuthContext.Provider value={{ token, setToken }}>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/tour" element={<Tour />} >
             <Route index element={<TourList />} />
             <Route path=":Id" element={<TourDetail />} />
            </Route>
            <Route element={<ProtectedRoute/>}>
              <Route path="/todo" element={<Todo />} />
            </Route>
            <Route path="signUp" element={<SignUp />} />
            <Route path="Login" element={<Login />} />
        </Route>
      </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
