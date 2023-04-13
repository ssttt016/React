import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { SERVERIP } from "../../CommonUtil";
import {Link} from "react-router-dom";

function BoardView(props) {

    return (
        <div className="container">
             <table className="table table-hover " style={{marginTop:"30px"}}>
            <tbody>
              <tr className="table-secondary">
                <th>제목</th>
                <td colspan="5">부트스트랩을 배워봅시다</td>
              </tr>
              <tr>
                <th >작성자</th>
                <td>홍길동</td>
                <th >작성일</th>
                <td>2021-12-27</td>
                <th  >조회수</th>
                <td>12</td> 
              </tr>
              <tr>
                <th colspan="6"  className="table-secondary">내용</th>
              </tr>
              <tr>
                <td colspan="6">
                  내용을 써봅시다<br/>내용을 써봅시다<br/>내용을 써봅시다<br/>내용을 써봅시다<br/>
                  내용을 써봅시다<br/>내용을 써봅시다<br/>내용을 써봅시다<br/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    );
}

export default BoardView;