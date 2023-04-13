import "bootstrap/dist/css/bootstrap.min.css";
//부트스트랩 라이브러리
import { Outlet, Link, NavLink } from "react-router-dom";

function Layout(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-warning navbar-dark">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link active" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/score/list">게시판</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/board/write">글쓰기</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link disabled" href="#">Disabled</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      {/*컴포넌트가 출력되는 위치이다.
      <a>앵커태그 대신에 NavLink 태그를 쓰자*/ }
      <div style={{marginTop:"20px"}}/>
      <Outlet/>
    </div>
  );
}

export default Layout;
