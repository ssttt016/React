//HeroList.js - 백엔드 서버로부터 데이터 가져온다
//axios - 설치 필요

import React, { useState, useEffect } from "react";
import axios from "axios";

function HeroList(props) {
  const [heroList, setHeroList] = useState([]);  
  const [loading, setLoading] = useState(false); //데이터를 수신하면 true로 바꾼다

  // useState함수가 값을 초기화를 해주면 해당 값을 저장할 변수와 해당값을 변경하는 함수를 반환함.
  // [] -> 배열을 저장할 변수반환, 배열값을 변환할 함수주소

  // 첫 번째 매개변수 - mount 될 때, update될 때, unmount될 때 호출된다.
  // [] - 변수:변수들이 바뀔 때 호출된다.

  useEffect(() => {
    // console.log("나 호출된다.");
    // setHeroList(heroList.concat([
    //     {id:1, name:"이순신", desc:"임란승리"},
    //     {id:2, name:"을지문덕", desc:"살수대첩"},
    //     {id:3, name:"세종대왕", desc:"한글창제"},
    // ]))

    // promise 기반 컴포넌트라서 리턴 값 X
    axios
      .get("http://localhost:9090/hero/list")
      .then((res) => {
        setHeroList(res.data);
        setLoading(true);
      })
      .catch((res, status, error) => {
        console.log(status);
      });
  }, []);

  return (
    <div>
      <table>
        {loading === true
          ? heroList.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.hero_name}</td>
                  <td>{item.hero_desc}</td>
                  <td>{item.wdate}</td>
                </tr>
              );
            })
          : ""}
      </table>
    </div>
  );
}

export default HeroList;
