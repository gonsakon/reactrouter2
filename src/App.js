import './css/App.css';
import FAQ from './components/FAQ.js';
import Tour from './components/Tour.js';
import TourDetail from './components/TourDetail.js';
import TourList from './components/TourList.js';
import { Routes, Route, Link,Outlet } from "react-router-dom";
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
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/tour" element={<Tour />} >
             <Route index element={<TourList />} />
             <Route path=":Id" element={<TourDetail />} />
            </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
