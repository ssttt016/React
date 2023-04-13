import logo from './logo.svg';
import './App.css';
import {Routes, Route, Outlet, Link} from "react-router-dom";
import Layout from './component/Layout';
import Home from './component/Home';
import About from './component/About';
import Fortest1 from './component/Fortest1';
import Fortest2 from './component/Fortest2';
import Gugudan from './component/Gugudan';

function App() {
  return (
    <div className="App">
      <h1>라우터 연습</h1>
      {/* path = 가상 url  element = 컴포넌트 */}
      <Routes>
        <Route path="/" element={<Layout/>}> 
        {/* 전체적인 라우터 골격은 Layout 컴포넌트에 놓는다 */}
          <Route index element={<Home/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="for1" element={<Fortest1/>}/>
          <Route path="for2" element={<Fortest2/>}/>
          <Route path="for3" element={<Gugudan/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
