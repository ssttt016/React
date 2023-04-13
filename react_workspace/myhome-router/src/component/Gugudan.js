import React, {useState} from 'react';

function Gugudan(props) {
    const [dan, setDan] = useState(4);  //단
    const [iList] = useState([1,2,3,4,5,6,7,8,9]);
    const [show, setShow] = useState(false); //show가 true일때만 화면에 구구단 출력

    const danChange = (e)=>{
        setShow(false);
        setDan(e.target.value); //단값 넣고
    }

    const goConfirm = ()=> {
        setShow(true); // 확인버튼 누르면 show->true로 바꿔서 화면에 출력되도록
    }

    return (
        <div>
            단 : <input type="text" onChange={danChange}></input><br/>
            <button type="button" onClick={goConfirm}>확인</button>
            <br/><br/>
            <ul>
                {
                    show?
                    iList.map( (item, index)=>{
                        return(
                           <li key={index}>
                               {dan} X {item} = {dan*item}
                           </li> 
                        )
                    })
                    :""
                }
                
            </ul>
        </div>
    );
}

export default Gugudan;