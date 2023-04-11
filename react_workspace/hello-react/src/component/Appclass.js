import React, { Component } from 'react';

class Appclass extends Component {
    // 생성자 - props와 state를 사용하고 싶으면 반드시 생성자를 써라
    // props - 부모 컴포넌트로부터 자식 컴포넌트에 값을 보내기 위한 수단이다.
    //         자식 컴포넌트로부터 부모컴포넌트로 값을 보낼 수단은 없다.
    //         - 단방향 컴포넌트
    constructor(props) {
        super(props); // 부모 생성자를 호출한다. 이 코드는 반드시 생성자의 첫 번째 위치에 있어야 한다.
                      // 앞에 다른 코드가 먼저 올 수 없다.
        this.state = { name:"홍길동", age:23, phone:"010-0000-0000"};
        // state객체가 각 컴포넌트마다 반드시 있다. 이 객체에 json 형태의 객체를 저장할 수 있다
        // 개별 변수는 태그에서 사용 못 한다.
    }
    
    render() {
        const {name, age, phone} = this.state;   //this.state에 JSON객체 저장   이걸 '해체'라고함
        // const name = this.state.name;
        const {title, address} = this.props;  // destruction -  json을 해체한 거, 이와 같은 방식으로도 가능
        return (
            <div>
                <h1>{title}</h1>
                <h3>이름 : {name}</h3>
                <h3>나이 : {age}</h3>
                <h3>전화 : {phone}</h3>
                <h3>주소 : {this.props.address}</h3>

                <button type="button" onClick={()=>{alert("press");}}>press</button>
            </div>
        );
    }
}


export default Appclass;