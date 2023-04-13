import logo from "./logo.svg";
import "./App.css";
import {Routes, Route, Outlet, Link} from "react-router-dom";

import Layout from './layout/Layout.js';
import ScoreList from "./component/ScoreList";

function App() {
  return (
    <div className="App">
      {/* path = 가상 url  element = 컴포넌트 */}
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 전체적인 라우터 골격은 Layout 컴포넌트에 놓는다 */}
          {/* <Route index element={<Home />} /> */}
          <Route path="/score/list" element={<ScoreList/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
