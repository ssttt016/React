import React, {useState} from 'react';

// props 사용하던 말던 기본 매개변수로 사용하자
function Inputtest(props){
    const [name, setName] = useState("");
    const [age, setage] = useState(0);
    const [email, setemail] = useState("");

    // 람다로 함수를 줘야함 , 일반함수의 경우 생성자에서 바인딩이라는 작업을 해야한다.
    // 함수기반 컴포넌트는 생성자를 만들 수 없어서 결론은 람다를 써야한다.
    const nameChange = (e)=>{
        // 인자가 - 발생한 이벤트에 대한 모든 정보
        // console.log(e.target.value); //키를 누른 모든 값이 저장되어 있다.
        setName(e.target.value); // name변수의 값이 바뀐다.
    }
    const ageChange = (e)=>{
        setage(e.target.value);
    }
    const emailChange = (e)=>{
        setemail(e.target.value);
    }

    let mystyle={
        color:"white",
        backgroundColor:"lightblue",
        fontSize:"11pt",
        padding:"10px 5px 20px 5px"
    }
    return(
        <div>
            이름 : <input type="text" onChange={nameChange} style={{color:"red",backgroundColor:"skyblue"}}></input><br/>
            나이 : <input type="text" onChange={ageChange} style={mystyle}></input><br/>
            이메일 : <input type="text" onChange={emailChange}></input>
            <p>{name} {age} {email}</p>
        </div>
    )
}



export default Inputtest;