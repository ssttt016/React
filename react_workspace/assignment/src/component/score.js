import React, {useState} from 'react';

function Score(props) {
    const [name, setName] = useState("");
    const [kor, setKor] = useState(0);
    const [eng, setEng] = useState(0);
    const [mat, setMat] = useState(0);
    const [sum, setSum] = useState(0);
    const [avg, setAvg] = useState(0);

    const nameChange = (e) =>{
        setName(e.target.value);
    }

    const korChange = (e) =>{
        setKor(parseInt(e.target.value));
    }

    const engChange = (e) =>{
        setEng(parseInt(e.target.value));
    }

    const matChange = (e) =>{
        setMat(parseInt(e.target.value));
    }

    const calChange = () => {
            setSum(kor+eng+mat);
            setAvg((kor+eng+mat)/3);
    }
    return (
        <div>
            이름 : <input type="text" onChange={nameChange}></input><br/>
            국어 : <input type="number" onChange={korChange}></input><br/>
            영어 : <input type="number" onChange={engChange}></input><br/>
            수학 : <input type="number" onChange={matChange}></input><br/>
            <button type="button" onClick={calChange}>결과확인</button>
            <h3>버튼 안 눌러도 되는 결과</h3>
            <p>{name}의 총점은 {kor+eng+mat} 평균은 {(kor+eng+mat)/3}이다.</p>
            <h3>버튼 누른 결과</h3>
            <p>{name}의 총점은 {sum} 평균은 {avg}이다.</p>
        </div>
    );
}

export default Score;