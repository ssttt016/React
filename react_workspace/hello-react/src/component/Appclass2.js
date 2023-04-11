import React, { useState } from 'react';

// 함수의 경우에는 생성자가 아니라 매개변수를 통한다
// 부모가 자식한테 값을 보낼 때 매개변수를 통해서 보낸다
// props -> JSON객체
function Appclass2(props) {
    // useState(변수의 초기값)  , setOO 은 함수임 () 가 생략되어 있을뿐
    const [name, setName] = useState("홍길동");
    const [age, setage] = useState(23);
    const {title, address} = props;
    return(
        <div>
            <h1>{title}</h1>
            <h3>이름 : {name}</h3>
            <h3>나이 : {age}</h3>
            <h3>주소 : {address}</h3>
        </div>
    )
}

export default Appclass2;