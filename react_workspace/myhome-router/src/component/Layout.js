import React, {Component} from 'react';
import {Routes, Route, Outlet, Link} from "react-router-dom";

// 화면구성을 담당할 함수
function Layout(props) {
    return (
        <div>
            <nav>    {/*메뉴*/}
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/About">About</Link></li>
                    <li><Link to="/for1">For1</Link></li>
                    <li><Link to="/for2">For2</Link></li>
                    <li><Link to="/for3">For3</Link></li>
                </ul>
            </nav>
            <hr/>
            <Outlet/>  {/*각 컴포넌트의 내용이 뿌려질 위치*/}
        </div>
    );
}

export default Layout;